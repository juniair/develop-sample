class CommandList {
    constructor() {
        this.undoCommands = [];
        this.commands = [];
    }

    do(command) {
        this.commands.push(command);
        command.do();
        
    }

    undo() {
        let command = this.commands.pop();
        command.undo();
        this.undoCommands.push(command)
    }

    undoAll() {
        for (const command of this.commands.reverse()) {
            command.undo();
            this.undoCommands.push(command)
        }
        this.commands = [];
    }

    redo() {
        let command = this.undoCommands.pop();
        command.do();
        this.commands.push(command)
    }

    redoAll() {
        for (const command of this.undoCommands.reverse()) {
            command.do();
            this.commands.push(command)
        }

        this.undoCommands = [];
    }

    clear() {
        this.undoCommands = [];
        this,this.commands = [];
    }
}

class ChainCommand {
    constructor(...commands) {
        this.commands = commands;
        
    }

    do() {
        for (const command of this.commands) {
            command.do();
        }
    }

    undo() {
        for (const command of this.commands) {
            command.undo();
        }
    }
}

class ObjectValueChangeCommand {
    constructor(target, key, beforeVal, afterVal) {
        this.target = target;
        this.key = key;
        if(beforeVal == undefined) {
            this.beforeVal = ""
        } else {
            this.beforeVal = beforeVal;
        }

        this.afterVal = afterVal;
    }

    do() {
        this.target[this.key] = this.afterVal;
    }

    undo() {
        this.target[this.key] = this.beforeVal;
    }
}

class SelectChangeCommand {
    constructor($selector, beforeVal, afterVal) {
        this.$selector = $selector;
        if(beforeVal == undefined) {
            this.beforeVal = ""
        } else {
            this.beforeVal = beforeVal;
        }
        
        this.afterVal = afterVal;
    }

    do() {
        this.$selector.val(this.afterVal);
        this.$selector.attr("data-prev-val", this.afterVal);
    }

    undo() {
        this.$selector.val(this.beforeVal);
        this.$selector.attr("data-prev-val", this.beforeVal);
    }
}



class CheckBoxChangeCommand {
    constructor($selector, beforeVal, afterVal) {
        this.$selector = $selector;
        this.beforeVal = beforeVal;
        this.afterVal = afterVal;
    }

    do() {
        this.$selector.prop("checked", this.afterVal);
    }

    undo() {
        console.log(this.$selector)
        this.$selector.prop("checked", this.beforeVal);
    }
}

class RadioChangeCommand {
    constructor($selector, beforeVal, afterVal) {
        this.$selector = $selector;
        this.beforeVal = beforeVal;
        this.afterVal = afterVal;
    }

    do() {
        this.$selector.prop("checked", this.afterVal);
    }

    undo() {
        this.$selector.prop("checked", this.beforeVal);
    }
}

class ImageChangeCommand {
    constructor($selector, beforeSrc, afterSrc) {
        this.$selector = $selector;
        this.beforeSrc = beforeSrc;
        this.afterSrc = afterSrc;
    }

    do() {
        this.$selector.attr("src", this.afterSrc);
    }

    undo() {
        console.log("src", this.beforeSrc);
        this.$selector.attr("src", this.beforeSrc);
    }
}

class TextChangeCommand {
    constructor($selector, beforeText, afterText) {
        this.$selector = $selector;
        if(beforeText == undefined) {
            this.beforeText = "";
        } else {
            this.beforeText = beforeText;
        }
        this.afterText = afterText;
    }

    do() {
        this.$selector.val(this.afterText);
        this.$selector.attr("data-prev-val", this.afterText);
    }

    undo() {
        this.$selector.val(this.beforeText);
        this.$selector.attr("data-prev-val", this.beforeText);
    }
}