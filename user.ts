interface Role {
    roleId: number,
}

interface ActiveRole extends Role {
    isActive: true,
}

type BooleanNumber = 1 | 0;

const isValue = true;

const adminRole = {
    roleId: 3,
    secondName: 'dd',
    isActive: true,
}

const setUserRole = (userName: string): Role => {
    const userRole: ActiveRole = {
        roleId: 3,
        isActive: true,
    };

    return userRole;
}

const activeRole = setUserRole('dd');

const isActiveRole = (role: Role): role is ActiveRole => {
    const isHasActive = role.hasOwnProperty('isActive');

    return isHasActive;
}

activeRole.roleId;

if (isActiveRole(activeRole)) {
    activeRole.isActive
}

type form = {
    name: 'string',
    lastName: 'string',
    age: any,
}


class UserClass {
    isActive = false;
    userName = '';
}

type User = {
    [additional: string]: string | number | Role,
    name: string,
    age: number,
    role: Role
}

const userVasya: User = {
    age: 2,
    role: {roleId: 4},
    name: 'Vasya',
    lastName: 'Petrov',
    hobby: 'skating'
}

Object.keys(Role);

type A = {
    a: number,
    c: boolean,
}

type B = {
    b: string,
}

let a: A = {
    a: 55,
    b: 'dd'
};

let b: B = {
    a: 55,
    b: 'dd'
};

let c: A & B = {
    a: 33,
    b: 'dd',
    c: true,
};


const createPage = (title: string, text: number, user: User) => {
    typeof title === 'string';
}

createPage(22, 'ddd', '')

export const getElemById = (id) => {
    return document.getElementById(id);
}

export const getElemById = (id: string, date: number, user: User) => {
    return document.getElementById(id);
};