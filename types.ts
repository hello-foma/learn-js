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




const fn = (val: string) => {
    val.codePointAt(1);
}

const fn2 = (val: boolean) => {
    !!val;
}

type UserInput<T> = T;

const getB = (): never => {
    console.log('');

    throw Error();
}

const c: never[] = [];

const getUsers = (name: string): User[] => {
    if (name.length === 0) {
        return c;
    }
}

let b = getB();

fn(b as unknown as string);
fn2(b as unknown as boolean);

const isString = (val: unknown): val is string => true;

// if (isString(b)) {
    
// }


interface UserProfile {
    id: string;
  
    preferences: {
      theme: "light" | "dark";
    };
  }
  
  let user: UserProfile = {
    id: "123",
    preferences: {
      theme: "blue",
    },
  };