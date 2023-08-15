"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Usuario_idUsuario, _Usuario_nomeUsuario, _Usuario_email, _Usuario_senha;
class Usuario {
    constructor(idUsuario, nomeUsuario, email, senha) {
        _Usuario_idUsuario.set(this, 0);
        _Usuario_nomeUsuario.set(this, "");
        _Usuario_email.set(this, "");
        _Usuario_senha.set(this, "");
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.senha = senha;
    }
    get idUsuario() {
        return __classPrivateFieldGet(this, _Usuario_idUsuario, "f");
    }
    get senha() {
        return __classPrivateFieldGet(this, _Usuario_senha, "f");
    }
    get nomeUsuario() {
        return __classPrivateFieldGet(this, _Usuario_nomeUsuario, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _Usuario_email, "f");
    }
    set idUsuario(idUsuario) {
        if (idUsuario === undefined || typeof idUsuario !== 'string' || idUsuario === "")
            throw ('idUsuario inválida');
        __classPrivateFieldSet(this, _Usuario_idUsuario, idUsuario, "f");
    }
    set senha(senha) {
        if (senha === undefined || typeof senha !== 'string' || senha === "")
            throw ('senha inválida');
        __classPrivateFieldSet(this, _Usuario_senha, senha, "f");
    }
    set nomeUsuario(nomeUsuario) {
        if (nomeUsuario === undefined || typeof nomeUsuario !== 'string' || nomeUsuario === "")
            throw ('nomeUsuario inválido');
        __classPrivateFieldSet(this, _Usuario_nomeUsuario, nomeUsuario, "f");
    }
    set email(email) {
        if (email === undefined || typeof email !== 'string' || email === "")
            throw ('email inválido');
        __classPrivateFieldSet(this, _Usuario_email, email, "f");
    }
}
_Usuario_idUsuario = new WeakMap(), _Usuario_nomeUsuario = new WeakMap(), _Usuario_email = new WeakMap(), _Usuario_senha = new WeakMap();
function novoUsuario(idUsuario, nomeUsuario, email, senha) {
    return new Usuario(idUsuario, nomeUsuario, email, senha);
}
module.exports = { novoUsuario };
