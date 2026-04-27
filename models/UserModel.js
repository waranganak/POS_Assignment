export const credentials = {
    username: "admin",
    password: "123"
};

export function authenticate(user, pass) {
    return user === credentials.username && pass === credentials.password;
}