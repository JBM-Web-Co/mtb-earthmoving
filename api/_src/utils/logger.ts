const logger = console;

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

type LogObject = {
    level: LogLevel;
    message: string;
    context?: string;
    data?: Record<string, unknown>;
};

function getContextFromStack(): string | undefined {
    const stack = new Error().stack;
    if (!stack) return;

    const lines = stack.split('\n');
    // Find the first line that's not from this logger file
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.includes('logger.ts')) {
            // Extract filename and function
            const fileMatch = line.match(
                /([^\\\\/]+\.(ts|tsx|js|jsx))(\?.*)?:(\d+)/
            );
            const funcMatch = line.match(/at ([\w.]+)/);

            if (fileMatch) {
                const filename = fileMatch[1];
                const funcName = funcMatch ? funcMatch[1] : 'anonymous';
                return `${filename} > ${funcName}`;
            }
        }
    }
}

function make_log_object(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
) {
    const context = getContextFromStack();
    const log_object: LogObject = {
        level,
        message,
    };
    if (context) {
        log_object.context = context;
    }
    if (data) {
        log_object.data = data;
    }

    return log_object;
}

export function debug(message: string, data?: Record<string, unknown>) {
    logger.debug(make_log_object('DEBUG', message, data));
}

export function info(message: string, data?: Record<string, unknown>) {
    logger.info(make_log_object('INFO', message, data));
}

export function warn(message: string, data?: Record<string, unknown>) {
    logger.warn(make_log_object('WARN', message, data));
}

export function error(message: string, data?: Record<string, unknown>) {
    logger.error(make_log_object('ERROR', message, data));
}
