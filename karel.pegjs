SourceFile := FunctionStatement*

Statement := { FunctionStatement | ExpressionStatement | IfStatement | WhileStatement | RepeatStatement }

FunctionStatement := 'function' WhiteSpace? name=Identifier '\(' WhiteSpace? '\)' WhiteSpace? block=Block WhiteSpace?
ExpressionStatement := expr=Expression WhiteSpace? ';' WhiteSpace?
IfStatement := 'if' WhiteSpace? '\(' WhiteSpace? condition=Expression WhiteSpace? '\)' WhiteSpace? ifblock=Block { WhiteSpace? 'else' WhiteSpace? elseblock=Block }?
WhileStatement := 'while' WhiteSpace? '\(' WhiteSpace? condition=Expression WhiteSpace? '\)' WhiteSpace? block=Block
RepeatStatement := 'repeat' WhiteSpace? '\(' WhiteSpace? count=Number WhiteSpace? '\)' WhiteSpace? block=Block

Expression := func=Identifier WhiteSpace? '\(\)' WhiteSpace?

Block := '{' WhiteSpace? stmts=Statement* WhiteSpace? '}'

WhiteSpace := '[ \t\r\n]*'

Identifier := '[a-zA-Z_][a-zA-Z0-9_]*'
Number := '[0-9]+'