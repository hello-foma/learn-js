type ListItems<T, R extends User, S> = {
    items: Array<T>,
    b: [T, R, S]
}

type A = 'string';

type Role = {
    role: string
}

type User = {
    name: string,
    age: number,
}

type SuperUser = User & Role;

let a: SuperUser;

type UsersList = ListItems<User>

type dateString = 'january' | 'december' | string;

const list: ListItems<SuperUser, dateString> = {
    b: [{name: '', age: 0, role: ''}, '', ''],
    items: []
}

function sumItems<T>(list: number[]): T {
    const a: T = {items: [], b: []};

    return sum;
}

const sumSuperUser = sumItems([])

class UserRole<T> {
    private role: T;
}

type UserPart = Partial<User>;

const v: UserPart = { }

