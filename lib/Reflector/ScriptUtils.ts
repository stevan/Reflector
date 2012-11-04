module Reflector {
    export module ScriptUtils {

        export function compileScriptstoAST ( scripts : string[] ): TypeScript.AST {
            var compiler = new TypeScript.TypeScriptCompiler( IO.stderr, IO.stderr );
            for ( var i = 0; i < scripts.length; i++ ) {
                compiler.addUnit( IO.readFile( scripts[i] ), scripts[i] );
            }
            compiler.typeCheck();
            return compiler.scripts;
        }

    }
}