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
var _Usuario_idUsuario, _Usuario_nomeUsuario, _Usuario_emailUsuario, _Usuario_senhaUsuario;
class Usuario {
    constructor(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) {
        _Usuario_idUsuario.set(this, 0);
        _Usuario_nomeUsuario.set(this, "");
        _Usuario_emailUsuario.set(this, "");
        _Usuario_senhaUsuario.set(this, "");
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.emailUsuario = emailUsuario;
        this.senhaUsuario = senhaUsuario;
    }
    get idUsuario() {
        return __classPrivateFieldGet(this, _Usuario_idUsuario, "f");
    }
    get senhaUsuario() {
        return __classPrivateFieldGet(this, _Usuario_senhaUsuario, "f");
    }
    get nomeUsuario() {
        return __classPrivateFieldGet(this, _Usuario_nomeUsuario, "f");
    }
    get emailUsuario() {
        return __classPrivateFieldGet(this, _Usuario_emailUsuario, "f");
    }
    set idUsuario(idUsuario) {
        if (idUsuario === undefined || typeof idUsuario !== 'string' || idUsuario === "")
            throw ('idUsuario inválida');
        __classPrivateFieldSet(this, _Usuario_idUsuario, idUsuario, "f");
    }
    set senhaUsuario(senhaUsuario) {
        if (senhaUsuario === undefined || typeof senhaUsuario !== 'string' || senhaUsuario === "")
            throw ('senhaUsuario inválida');
        __classPrivateFieldSet(this, _Usuario_senhaUsuario, senhaUsuario, "f");
    }
    set nomeUsuario(nomeUsuario) {
        if (nomeUsuario === undefined || typeof nomeUsuario !== 'string' || nomeUsuario === "")
            throw ('nomeUsuario inválido');
        __classPrivateFieldSet(this, _Usuario_nomeUsuario, nomeUsuario, "f");
    }
    set emailUsuario(emailUsuario) {
        if (emailUsuario === undefined || typeof emailUsuario !== 'string' || emailUsuario === "")
            throw ('emailUsuario inválido');
        __classPrivateFieldSet(this, _Usuario_emailUsuario, emailUsuario, "f");
    }
}
_Usuario_idUsuario = new WeakMap(), _Usuario_nomeUsuario = new WeakMap(), _Usuario_emailUsuario = new WeakMap(), _Usuario_senhaUsuario = new WeakMap();
function novoUsuario(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) {
    return new Usuario(idUsuario, nomeUsuario, emailUsuario, senhaUsuario);
}
module.exports = { novoUsuario };
