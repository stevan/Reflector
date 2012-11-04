
module Reflector {
    export module ASTWalker {

        export function walk ( ast : TypeScript.AST, state : Object ): Object {
            //console.log( ast.printLabel() );
            //console.log( JSON.stringify( state, null, "  " ) );
            switch ( ast.nodeType ) {
                case TypeScript.NodeType.Name      : return walkName( <TypeScript.Identifier> ast, state );
                case TypeScript.NodeType.TypeRef   : return walkTypeRef( <TypeScript.TypeReference> ast, state );
                case TypeScript.NodeType.VarDecl   : return walkTypedMember( <TypeScript.BoundDecl> ast, state );
                case TypeScript.NodeType.List      : return walkList( <TypeScript.ASTList> ast, state );
                case TypeScript.NodeType.Script    : return walkScript( <TypeScript.Script> ast, state );
                case TypeScript.NodeType.Interface : return walkInterface( <TypeScript.TypeDecl> ast, state );
            }
            return {};
        }

        function walkName ( ast: TypeScript.Identifier, state : Object ): Object {
            state['name'] = ast.text;
            return state;
        }

        function walkList ( list: TypeScript.ASTList, state : Object ): Object {
            var acc = [];
            for (var i = 0; i < list.members.length; i++) {
                acc.push( walk( list.members[i], {} ) );
            }
            state['elements'] = acc;
            return state;
        }

        function walkScript ( script: TypeScript.Script, state : Object ): Object {
            state['type'] = 'Script';
            if ( script.bod ) {
                state['body'] = walk( script.bod, {} );
            }
            return state;
        }

        function walkInterface ( ast : TypeScript.TypeDecl, state : Object ): Object {
            state['type'] = 'Interface';
            state['name'] = walk( ast.name, {} );
            if ( ast.members ) {
                state['members'] = walk( ast.members, {} );
            }
            if ( ast.extendsList ) {
                state['extends'] = walk( ast.extendsList, {} );
            }
            if ( ast.implementsList ) {
                state['implements'] = walk( ast.implementsList, {} );
            }
            return state;
        }

        function walkTypeRef (ast: TypeScript.TypeReference, state : Object ): Object {
            if ( ast.term ) {
                state['isa']      = walk( ast.term, {} );
                state['is_array'] = ast.type.isArray();
            }
            return state;
        }

        function walkTypedMember ( ast: TypeScript.BoundDecl, state : Object ): Object {
            state['type'] = 'Property';
            if ( ast.id ) {
                state['id'] = walk( ast.id, {} );
            }
            if ( ast.init ) {
                state['init'] = walk( ast.init, {} );
            }
            if ( ast.typeExpr ) {
                state['type_expr'] = walk( ast.typeExpr, {} );
            }

            var sym : TypeScript.Symbol = <TypeScript.Symbol> ast.sym;
            state['is_optional'] = TypeScript.hasFlag( sym.flags, TypeScript.SymbolFlags.Optional );

            return state;
        }

    }
}