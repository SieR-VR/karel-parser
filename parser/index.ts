import {
    Token,
    TokenKind,
    isIdentifierToken,
    isNumberToken,
} from './tokenizer';

export function parse(input: Token[]): SourceFile {
    const sourceFile = {
        functions: [] as FunctionDeclaration[]
    };

    let current = 0;

    while (current < input.length) {
        const token = input[current];

        if (token.kind === TokenKind.FunctionToken) {
            const functionDeclaration = parseFunctionDeclaration(input, current);
            sourceFile.functions.push(functionDeclaration);
            current = functionDeclaration.endPos;
        }
    }

    return sourceFile;
}

function parseFunctionDeclaration(input: Token[], startPos: number): FunctionDeclaration {
    const functionDeclaration = {
        kind: 'FunctionDeclaration',
        name: '',
        body: {} as BlockStatement,
        startPos,
        endPos: 0
    } as FunctionDeclaration;

    let current = startPos + 1;
    const functionIdentifer = input[current];
    if (!isIdentifierToken(functionIdentifer)) {
        throw new Error('Expected identifier');
    }

    functionDeclaration.name = functionIdentifer.value;
    current++;

    const lparen = input[current];
    if (lparen.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const rparen = input[current];
    if (rparen.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    functionDeclaration.body = parseBlockStatement(input, current);
    functionDeclaration.endPos = functionDeclaration.body.endPos;

    return functionDeclaration;
}

function parseBlockStatement(input: Token[], startPos: number): BlockStatement {
    const blockStatement = {
        kind: 'BlockStatement',
        statements: [] as Statement[],
        startPos,
        endPos: 0
    } as BlockStatement;

    let current = startPos;

    const lbrace = input[current];
    if (lbrace.kind !== TokenKind.LBrace) {
        throw new Error('Expected {');
    }
    current++;

    while (current < input.length) {
        const token = input[current];

        if (token.kind === TokenKind.RBrace) {
            blockStatement.endPos = current + 1;
            return blockStatement;
        }

        const statement = parseStatement(input, current);
        blockStatement.statements.push(statement);
        current = statement.endPos;
    }

    throw new Error('Expected }');
}

function parseStatement(input: Token[], startPos: number): Statement {
    const token = input[startPos];

    if (token.kind === TokenKind.Identifier) {
        return parseCallStatement(input, startPos);
    }

    if (token.kind === TokenKind.IfToken) {
        return parseIfStatement(input, startPos);
    }

    if (token.kind === TokenKind.WhileToken) {
        return parseWhileStatement(input, startPos);
    }

    if (token.kind === TokenKind.RepeatToken) {
        return parseRepeatStatement(input, startPos);
    }

    if (token.kind === TokenKind.LBrace) {
        return parseBlockStatement(input, startPos);
    }

    throw new Error(`Unexpected token: ${token.kind}`);
}

function parseCallStatement(input: Token[], startPos: number): CallStatement {
    const callStatement = {
        kind: 'CallStatement',
        function: '',
        startPos,
        endPos: 0
    } as CallStatement;
    
    let current = startPos;

    const identifier = input[current];
    if (!isIdentifierToken(identifier)) {
        throw new Error('Expected identifier');
    }
    callStatement.function = identifier.value;
    current++;

    const lparen = input[current];
    if (lparen.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const rparen = input[current];
    if (rparen.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    const semicolon = input[current];
    if (semicolon.kind !== TokenKind.SemiColon) {
        throw new Error('Expected ;');
    }
    current++;

    callStatement.endPos = current;
    return callStatement;
}

function parseIfStatement(input: Token[], startPos: number): IfStatement {
    const ifStatement = {
        kind: 'IfStatement',
        condition_function: '',
        body: {} as BlockStatement,
        startPos,
        endPos: 0
    } as IfStatement;

    let current = startPos + 1;

    const lparen = input[current];
    if (lparen.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const identifier = input[current];
    if (!isIdentifierToken(identifier)) {
        throw new Error('Expected identifier');
    }
    ifStatement.condition_function = identifier.value;
    current++;

    const lparen2 = input[current];
    if (lparen2.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const rparen2 = input[current];
    if (rparen2.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    const rparen = input[current];
    if (rparen.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    ifStatement.body = parseBlockStatement(input, current);

    const elseToken = input[ifStatement.body.endPos];
    if (elseToken.kind === TokenKind.ElseToken) {
        ifStatement.else = parseBlockStatement(input, ifStatement.body.endPos + 1);
        ifStatement.endPos = ifStatement.else.endPos;
    } else {
        ifStatement.endPos = ifStatement.body.endPos;
    }

    return ifStatement;
}

function parseWhileStatement(input: Token[], startPos: number): WhileStatement {
    const whileStatement = {
        kind: 'WhileStatement',
        condition_function: '',
        body: {} as BlockStatement,
        startPos,
        endPos: 0
    } as WhileStatement;

    let current = startPos + 1;

    const lparen = input[current];
    if (lparen.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const identifier = input[current];
    if (!isIdentifierToken(identifier)) {
        throw new Error('Expected identifier');
    }
    whileStatement.condition_function = identifier.value;
    current++;

    const lparen2 = input[current];
    if (lparen2.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const rparen2 = input[current];
    if (rparen2.kind !== TokenKind.RParen) { 
        throw new Error('Expected )');
    }
    current++;

    const rparen = input[current];
    if (rparen.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    whileStatement.body = parseBlockStatement(input, current);
    whileStatement.endPos = whileStatement.body.endPos;

    return whileStatement;
}

function parseRepeatStatement(input: Token[], startPos: number): RepeatStatement {
    const repeatStatement = {
        kind: 'RepeatStatement',
        repeat_count: 0,
        body: {} as BlockStatement,
        startPos,
        endPos: 0
    } as RepeatStatement;

    let current = startPos + 1;

    const lparen = input[current];
    if (lparen.kind !== TokenKind.LParen) {
        throw new Error('Expected (');
    }
    current++;

    const number = input[current];
    if (!isNumberToken(number)) {
        throw new Error('Expected number');
    }
    repeatStatement.repeat_count = number.value;
    current++;

    const rparen = input[current];
    if (rparen.kind !== TokenKind.RParen) {
        throw new Error('Expected )');
    }
    current++;

    repeatStatement.body = parseBlockStatement(input, current);
    repeatStatement.endPos = repeatStatement.body.endPos;

    return repeatStatement;
}

export interface SourceFile {
    functions: FunctionDeclaration[];
}

export interface FunctionDeclaration {
    kind: 'FunctionDeclaration';
    name: string;
    body: BlockStatement;
    startPos: number;
    endPos: number;
}

export interface BlockStatement {
    kind: 'BlockStatement';
    statements: Statement[];
    startPos: number;
    endPos: number;
}

export interface CallStatement {
    kind: 'CallStatement';
    function: string;
    startPos: number;
    endPos: number;
}

export interface IfStatement {
    kind: 'IfStatement';
    condition_function: string;
    body: BlockStatement;
    else?: BlockStatement;
    startPos: number;
    endPos: number;
}

export interface WhileStatement {
    kind: 'WhileStatement';
    condition_function: string;
    body: BlockStatement;
    startPos: number;
    endPos: number;
}

export interface RepeatStatement {
    kind: 'RepeatStatement';
    repeat_count: number;
    body: BlockStatement;
    startPos: number;
    endPos: number;
}

export type Statement =
    | BlockStatement
    | CallStatement
    | IfStatement
    | WhileStatement
    | RepeatStatement;