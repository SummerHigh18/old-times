
const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const root = '~';
let cwd = root;
const user = 'admin';
const server = 'old-times';

function prompt() {
    return `${user}@${server}${cwd}$ `;
}



const directories = {
    'recycle-bin': [
        '',
        '<white>Recycle-Bin</white>',

        '* <yellow>Empty</yellow>',
        ''
    ],
    Documents: [
        '',
        '<white>Documents</white>',
        '*<yellow> Empty</yellow>',
        ''
    ].flat()
};

const dirs = Object.keys(directories);
function print_home() {
     term.echo(dirs.map(dir => {
         return `<blue class="directory">${dir}</blue>`;
     }).join('\n'));
}



const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    echo(...args) {
        term.echo(args.join(' '))
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dir.startsWith('../') && cwd !== root &&
                   dirs.includes(dir.substring(3))) {
            cwd = root + '/' + dir.substring(3);
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_home();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_home();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_home();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    },

    ipconfig(...args) {
        const fullArgument = args.join(' ');
        if (fullArgument === '/dns --history') {
            this.echo('Last visited: /hosting');
        } else {
            this.error('Enter a valid argument!')
        }
    }
};

const command_list = Object.keys(commands);

const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});


const help = formatter.format(command_list);



const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    prompt,
    completion: true,
    completion(string) {
        // in every function we can use `this` to reference term object
        const cmd = this.get_command();
        // we process the command to extract the command name
        // and the rest of the command (the arguments as one string)
        const { name, rest } = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return dirs.map(dir => `~/${dir}`);
            }
            if (rest.startsWith('../') && cwd != root) {
                return dirs.map(dir => `../${dir}`);
            }
            if (cwd === root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    }

});




