/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* SourceFile := FunctionStatement*
* Statement := { FunctionStatement | ExpressionStatement | IfStatement | WhileStatement | RepeatStatement }
* FunctionStatement := 'function' WhiteSpace? name=Identifier '\(' WhiteSpace? '\)' WhiteSpace? block=Block WhiteSpace?
* ExpressionStatement := expr=Expression WhiteSpace? ';' WhiteSpace?
* IfStatement := 'if' WhiteSpace? '\(' WhiteSpace? condition=Expression WhiteSpace? '\)' WhiteSpace? ifblock=Block { WhiteSpace? 'else' WhiteSpace? elseblock=Block }?
* WhileStatement := 'while' WhiteSpace? '\(' WhiteSpace? condition=Expression WhiteSpace? '\)' WhiteSpace? block=Block
* RepeatStatement := 'repeat' WhiteSpace? '\(' WhiteSpace? count=Number WhiteSpace? '\)' WhiteSpace? block=Block
* Expression := func=Identifier WhiteSpace? '\(\)' WhiteSpace?
* Block := '{' WhiteSpace? stmts=Statement* WhiteSpace? '}'
* WhiteSpace := '[ \t\r\n]*'
* Identifier := '[a-zA-Z_][a-zA-Z0-9_]*'
* Number := '[0-9]+'
*/
type Nullable<T> = T | null;
type $$RuleType<T> = () => Nullable<T>;
export interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    SourceFile = "SourceFile",
    Statement = "Statement",
    Statement_$0_1 = "Statement_$0_1",
    Statement_$0_2 = "Statement_$0_2",
    Statement_$0_3 = "Statement_$0_3",
    Statement_$0_4 = "Statement_$0_4",
    Statement_$0_5 = "Statement_$0_5",
    FunctionStatement = "FunctionStatement",
    ExpressionStatement = "ExpressionStatement",
    IfStatement = "IfStatement",
    IfStatement_$0 = "IfStatement_$0",
    WhileStatement = "WhileStatement",
    RepeatStatement = "RepeatStatement",
    Expression = "Expression",
    Block = "Block",
    WhiteSpace = "WhiteSpace",
    Identifier = "Identifier",
    Number = "Number",
}
export type SourceFile = FunctionStatement[];
export type Statement = Statement_$0;
export type Statement_$0 = Statement_$0_1 | Statement_$0_2 | Statement_$0_3 | Statement_$0_4 | Statement_$0_5;
export type Statement_$0_1 = FunctionStatement;
export type Statement_$0_2 = ExpressionStatement;
export type Statement_$0_3 = IfStatement;
export type Statement_$0_4 = WhileStatement;
export type Statement_$0_5 = RepeatStatement;
export interface FunctionStatement {
    kind: ASTKinds.FunctionStatement;
    name: Identifier;
    block: Block;
}
export interface ExpressionStatement {
    kind: ASTKinds.ExpressionStatement;
    expr: Expression;
}
export interface IfStatement {
    kind: ASTKinds.IfStatement;
    condition: Expression;
    ifblock: Block;
}
export interface IfStatement_$0 {
    kind: ASTKinds.IfStatement_$0;
    elseblock: Block;
}
export interface WhileStatement {
    kind: ASTKinds.WhileStatement;
    condition: Expression;
    block: Block;
}
export interface RepeatStatement {
    kind: ASTKinds.RepeatStatement;
    count: Number;
    block: Block;
}
export interface Expression {
    kind: ASTKinds.Expression;
    func: Identifier;
}
export interface Block {
    kind: ASTKinds.Block;
    stmts: Statement[];
}
export type WhiteSpace = string;
export type Identifier = string;
export type Number = string;
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    private memoSafe: boolean = true;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public clearMemos(): void {
    }
    public matchSourceFile($$dpth: number, $$cr?: ErrorTracker): Nullable<SourceFile> {
        return this.loop<FunctionStatement>(() => this.matchFunctionStatement($$dpth + 1, $$cr), true);
    }
    public matchStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement> {
        return this.matchStatement_$0($$dpth + 1, $$cr);
    }
    public matchStatement_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0> {
        return this.choice<Statement_$0>([
            () => this.matchStatement_$0_1($$dpth + 1, $$cr),
            () => this.matchStatement_$0_2($$dpth + 1, $$cr),
            () => this.matchStatement_$0_3($$dpth + 1, $$cr),
            () => this.matchStatement_$0_4($$dpth + 1, $$cr),
            () => this.matchStatement_$0_5($$dpth + 1, $$cr),
        ]);
    }
    public matchStatement_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0_1> {
        return this.matchFunctionStatement($$dpth + 1, $$cr);
    }
    public matchStatement_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0_2> {
        return this.matchExpressionStatement($$dpth + 1, $$cr);
    }
    public matchStatement_$0_3($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0_3> {
        return this.matchIfStatement($$dpth + 1, $$cr);
    }
    public matchStatement_$0_4($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0_4> {
        return this.matchWhileStatement($$dpth + 1, $$cr);
    }
    public matchStatement_$0_5($$dpth: number, $$cr?: ErrorTracker): Nullable<Statement_$0_5> {
        return this.matchRepeatStatement($$dpth + 1, $$cr);
    }
    public matchFunctionStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<FunctionStatement> {
        return this.run<FunctionStatement>($$dpth,
            () => {
                let $scope$name: Nullable<Identifier>;
                let $scope$block: Nullable<Block>;
                let $$res: Nullable<FunctionStatement> = null;
                if (true
                    && this.regexAccept(String.raw`(?:function)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$name = this.matchIdentifier($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\()`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\))`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$block = this.matchBlock($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.FunctionStatement, name: $scope$name, block: $scope$block};
                }
                return $$res;
            });
    }
    public matchExpressionStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<ExpressionStatement> {
        return this.run<ExpressionStatement>($$dpth,
            () => {
                let $scope$expr: Nullable<Expression>;
                let $$res: Nullable<ExpressionStatement> = null;
                if (true
                    && ($scope$expr = this.matchExpression($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:;)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.ExpressionStatement, expr: $scope$expr};
                }
                return $$res;
            });
    }
    public matchIfStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<IfStatement> {
        return this.run<IfStatement>($$dpth,
            () => {
                let $scope$condition: Nullable<Expression>;
                let $scope$ifblock: Nullable<Block>;
                let $$res: Nullable<IfStatement> = null;
                if (true
                    && this.regexAccept(String.raw`(?:if)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\()`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$condition = this.matchExpression($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\))`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$ifblock = this.matchBlock($$dpth + 1, $$cr)) !== null
                    && ((this.matchIfStatement_$0($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.IfStatement, condition: $scope$condition, ifblock: $scope$ifblock};
                }
                return $$res;
            });
    }
    public matchIfStatement_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<IfStatement_$0> {
        return this.run<IfStatement_$0>($$dpth,
            () => {
                let $scope$elseblock: Nullable<Block>;
                let $$res: Nullable<IfStatement_$0> = null;
                if (true
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:else)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$elseblock = this.matchBlock($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.IfStatement_$0, elseblock: $scope$elseblock};
                }
                return $$res;
            });
    }
    public matchWhileStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<WhileStatement> {
        return this.run<WhileStatement>($$dpth,
            () => {
                let $scope$condition: Nullable<Expression>;
                let $scope$block: Nullable<Block>;
                let $$res: Nullable<WhileStatement> = null;
                if (true
                    && this.regexAccept(String.raw`(?:while)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\()`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$condition = this.matchExpression($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\))`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$block = this.matchBlock($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.WhileStatement, condition: $scope$condition, block: $scope$block};
                }
                return $$res;
            });
    }
    public matchRepeatStatement($$dpth: number, $$cr?: ErrorTracker): Nullable<RepeatStatement> {
        return this.run<RepeatStatement>($$dpth,
            () => {
                let $scope$count: Nullable<Number>;
                let $scope$block: Nullable<Block>;
                let $$res: Nullable<RepeatStatement> = null;
                if (true
                    && this.regexAccept(String.raw`(?:repeat)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\()`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$count = this.matchNumber($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\))`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$block = this.matchBlock($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.RepeatStatement, count: $scope$count, block: $scope$block};
                }
                return $$res;
            });
    }
    public matchExpression($$dpth: number, $$cr?: ErrorTracker): Nullable<Expression> {
        return this.run<Expression>($$dpth,
            () => {
                let $scope$func: Nullable<Identifier>;
                let $$res: Nullable<Expression> = null;
                if (true
                    && ($scope$func = this.matchIdentifier($$dpth + 1, $$cr)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:\(\))`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.Expression, func: $scope$func};
                }
                return $$res;
            });
    }
    public matchBlock($$dpth: number, $$cr?: ErrorTracker): Nullable<Block> {
        return this.run<Block>($$dpth,
            () => {
                let $scope$stmts: Nullable<Statement[]>;
                let $$res: Nullable<Block> = null;
                if (true
                    && this.regexAccept(String.raw`(?:{)`, $$dpth + 1, $$cr) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && ($scope$stmts = this.loop<Statement>(() => this.matchStatement($$dpth + 1, $$cr), true)) !== null
                    && ((this.matchWhiteSpace($$dpth + 1, $$cr)) || true)
                    && this.regexAccept(String.raw`(?:})`, $$dpth + 1, $$cr) !== null
                ) {
                    $$res = {kind: ASTKinds.Block, stmts: $scope$stmts};
                }
                return $$res;
            });
    }
    public matchWhiteSpace($$dpth: number, $$cr?: ErrorTracker): Nullable<WhiteSpace> {
        return this.regexAccept(String.raw`(?:[ \t\r\n]*)`, $$dpth + 1, $$cr);
    }
    public matchIdentifier($$dpth: number, $$cr?: ErrorTracker): Nullable<Identifier> {
        return this.regexAccept(String.raw`(?:[a-zA-Z_][a-zA-Z0-9_]*)`, $$dpth + 1, $$cr);
    }
    public matchNumber($$dpth: number, $$cr?: ErrorTracker): Nullable<Number> {
        return this.regexAccept(String.raw`(?:[0-9]+)`, $$dpth + 1, $$cr);
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchSourceFile(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchSourceFile(0);
        if (res)
            return {ast: res, errs: []};
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchSourceFile(0, rec);
        const err = rec.getErr()
        return {ast: res, errs: err !== null ? [err] : []}
    }
    public mark(): PosInfo {
        return this.pos;
    }
    private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private run<T>($$dpth: number, fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn()
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, dpth: number, cr?: ErrorTracker): Nullable<string> {
        return this.run<string>(dpth,
            () => {
                const reg = new RegExp(match, "y");
                const mrk = this.mark();
                reg.lastIndex = mrk.overallPos;
                const res = this.tryConsume(reg);
                if(cr) {
                    cr.record(mrk, res, {
                        kind: "RegexMatch",
                        // We substring from 3 to len - 1 to strip off the
                        // non-capture group syntax added as a WebKit workaround
                        literal: match.substring(3, match.length - 1),
                        negated: this.negating,
                    });
                }
                return res;
            });
    }
    private tryConsume(reg: RegExp): Nullable<string> {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    private memoise<K>(rule: $$RuleType<K>, memo: Map<number, [Nullable<K>, PosInfo]>): Nullable<K> {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if(this.memoSafe && $scope$memoRes !== undefined) {
        this.reset($scope$memoRes[1]);
        return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if(this.memoSafe)
        memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export interface ParseResult {
    ast: Nullable<SourceFile>;
    errs: SyntaxErr[];
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export interface RegexMatch {
    readonly kind: "RegexMatch";
    readonly negated: boolean;
    readonly literal: string;
}
export type EOFMatch = { kind: "EOF"; negated: boolean };
export type MatchAttempt = RegexMatch | EOFMatch;
export class SyntaxErr {
    public pos: PosInfo;
    public expmatches: MatchAttempt[];
    constructor(pos: PosInfo, expmatches: MatchAttempt[]) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ': ''}'${x.literal}'`)}`;
    }
}
class ErrorTracker {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private regexset: Set<string> = new Set();
    private pmatches: MatchAttempt[] = [];
    public record(pos: PosInfo, result: any, att: MatchAttempt) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear()
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if(att.kind === "RegexMatch") {
                if(!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            } else {
                this.pmatches.push(att);
            }
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}