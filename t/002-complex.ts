///<reference path='../../typescript/src/compiler/io.ts' />
///<reference path='../../typescript/src/compiler/typescript.ts' />
///<reference path='../lib/InterfaceReflector.ts' />

var ast : TypeScript.AST = IntefaceReflector.compileScriptstoAST([ './t/tests/complex.ts' ]);

var metadata : Object = IntefaceReflector.ASTWalker.walk( ast, {} );

console.log( JSON.stringify( metadata, null, '  ' ) );