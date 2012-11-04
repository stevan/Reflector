module Reflector {

    // types are everywhere ...
    export interface IType {
        name : string;
    }

    // Programs ...

    export interface IProgram {
        scripts : IScript[];
    }

    // can have Scripts ...

    export interface IScript {
        topLevel : IModule;
        modules  : IModule[];
    }

    // which contain Modules ...

    export interface IModule {
        variables  : IVariable[];
        functions  : IFunction[];
        classes    : IClass[];
        interfaces : IInterface[];
        modules    : IModule[];

        getAllExports (): {
            variables  : IVariable[];
            functions  : IFunction[];
            classes    : IClass[];
            interfaces : IInterface[];
            modules    : IModule[];
        };
    }

    // which contain Variables ...

    export interface IVariable {
        name : string;
        type : IType;
    }

    // which contain Functions ...

    export interface IFunction {
        name       : string;
        signatures : ISignature[];

        isOverloaded (): bool;
    }

        // which has (multiple) signatures
        export interface ISignature {
            parameters : IParameter[];
            returnType : IType;

            hasOptionalParameters (): bool;
            getOptionalParameters (): IParameter[];
            hasRestParameter      (): bool;
            getRestParameter      (): IParameter;
        }

            // which have parameters ...
            export interface IParameter {
                name : string;
                type : IType;

                isRequired    (): bool;
                isOptional    (): bool;
                isRest        (): bool;
                isInitialized (): bool;
            }

    // which contain Classes ...

    export interface IClass {
        name        : string;

        implements  : IInterface[];
        extends     : IClass;

        constructor : IConstructor;
        properties  : IProperty[];
        methods     : IMethod[];

        getInstanceProperites (): IProperty[];
        getStaticProperites   (): IProperty[];

        getInstanceMethods    (): IMethod[];
        getStaticMethods      (): IMethod[];

        getInterface          (): IInterface;
        getStaticInterface    (): IInterface;
    }

        // which has a constructor ...
        export interface IConstructor extends IMethod {
            isStatic (): bool;
        }

            // some of whose parameters might
            // be special property parameters
            export interface IConstructorParameter extends IParameter {
                isProperty            (): bool;
                getAssociatedProperty (): IProperty;
            }


        // which has properties
        export interface IProperty extends IVariable {
            isStatic      (): bool;
            isPrivate     (): bool;
            isPublic      (): bool;
            isInitialized (): bool;
        }

        // which has methods
        export interface IMethod extends IFunction {
            isPrivate (): bool;
            isPublic  (): bool;
        }


    // which contain Intefaces ...

    export interface IInterface extends IType {
        name                : string;
        extends             : IInterface[];

        properties          : IInterfaceProperty[];
        methods             : IInterfaceMethod[];
        callSignatures      : ISignature[];
        indexSignatures     : IIndexSignature[];
        constructSignatures : ISignature[];
    }

        // which has properties
        export interface IInterfaceProperty {
            name : string;
            type : IType;

            isRequired (): bool;
            isOptional (): bool;
        }

        // which has methods
        export interface IInterfaceMethod {
            name       : string;
            signatures : ISignature[];
        }

        // which has index signatures
        export interface IIndexSignature {
            indexType   : IType;
            elementType : IType;
        }

        // note that callSignatures and constructSignatures
        // are really just Signatures anyway

}