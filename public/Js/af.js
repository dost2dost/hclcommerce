class AntiFlood {
    constructor() {
        this.users = new Map();
    }
    /**    
     * @param {Object} message { timestamp, text, user, approx_time_writting }
     */
    check(message) {
        if (!this.users.has(message.user)) {
            this.users.set(message.user, {
                warnings: 0,
                last_msg: [message],
                chars_per_minute: chars_per_min(message)
            });
            return false;
        }

        let info = this.users.get(message.user);
        info.last_msg.push(message);

        if (info.last_msg.length == 5) {
            this.users.delete(message.user);

            if (get_median(info.last_msg) >= 650)
                return true;

            if (is_one_word_messages(info.last_msg))
                return true;

            
        } else if (info.last_msg.length >= 3 && is_approx_messages(info.last_msg)) {
            return true;
        } else {
            this.users.set(message.user, info);
        }

        return false;
    }
}

const get_median = messages => {
    let chars = new Array();
    for (let i = 0; i < messages.length; i++)
        chars.push(chars_per_min(messages[i]));

    chars.sort();
    if (chars.length % 2 == 0) {
        let med = chars.length / 2;
        return (chars[med - 1] + chars[med]) / 2;
    } 
    else
        return chars[Math.trunc(chars.length / 2)];
};

const is_one_word_messages = messages => {
    let distance = messages[messages.length - 1].timestamp - messages[0].timestamp;
    let mask = 0b00000;
    let len = 0;
    
    for (let i = 0; i < messages.length; i++) {
        mask |= (messages[i].text.split(' ').length < 3) << i;
        len += messages[i].text.length;
    }

    return distance <= 10000 && bits_count(mask, 5) >= 3;
};

const is_approx_messages = messages => {
    let mask = 0b00000;
    for (let i = 0; i < messages.length - 1; i++)
        mask |= (messages[i].text.toUpperCase() == messages[i + 1].text.toUpperCase()) << i;
    
    return bits_count(mask, 4) >= 3;
};

const chars_per_min = message => message.text.length / (message.approx_time_writting / 60);

const bits_count = (mask, len) => {
    let length = 0;
    for (let i = 0; i < len; i++) {
        if (mask & (0b1 << i))
            length++;
    }
    return length;
};