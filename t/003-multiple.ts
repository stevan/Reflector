///<reference path='../../typescript/src/compiler/io.ts' />
///<reference path='../../typescript/src/compiler/typescript.ts' />
///<reference path='../lib/Reflector.ts' />
///<reference path='../lib/Reflector/ScriptUtils.ts' />
///<reference path='../lib/Reflector/ASTWalker.ts' />

var ast : TypeScript.AST = Reflector.ScriptUtils.compileScriptstoAST([ './t/tests/multiple.ts' ]);

var metadata : Object = Reflector.ASTWalker.walk( ast, {} );

console.log( JSON.stringify( metadata, null, '  ' ) );