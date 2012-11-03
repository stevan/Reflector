interface Person {
    name : {
        first : string;
        last  : string;
    };
}

interface Manager extends Person {}

interface Employee extends Person {
    manager : Manager;
}