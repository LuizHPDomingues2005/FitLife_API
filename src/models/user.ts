class Usuario
{
    #idUsuario:         number = 0
    #nomeUsuario:       string = ""
    #email:             string = ""
    #senha:             string = ""
    
    constructor (idUsuario: number, nomeUsuario: string, email: string, senha: string)
    {
        this.idUsuario        = idUsuario;
        this.nomeUsuario      = nomeUsuario;
        this.email            = email;
        this.senha     = senha;
    }


    get idUsuario ()
    {
        return this.#idUsuario
    }

    get senha ()
    {
        return this.#senha
    }

    get nomeUsuario ()
    {
        return this.#nomeUsuario
    }


    get email ()
    {
        return this.#email
    }

    set idUsuario (idUsuario)
    {
        if (idUsuario===undefined || typeof idUsuario !== 'string' || idUsuario==="")
            throw ('idUsuario inválida');

        this.#idUsuario = idUsuario;
    }

    set senha (senha)
    {
        if (senha===undefined || typeof senha !== 'string' || senha==="")
            throw ('senha inválida');

        this.#senha = senha;
    }

    set nomeUsuario (nomeUsuario)
    {
        if (nomeUsuario===undefined || typeof nomeUsuario !== 'string' || nomeUsuario==="")
            throw ('nomeUsuario inválido');

        this.#nomeUsuario = nomeUsuario;
    }

    set email (email)
    {
        if (email===undefined || typeof email !== 'string' || email==="")
            throw ('email inválido');

        this.#email = email;
    }

    

}

function novoUsuario (idUsuario: number, nomeUsuario: string, email: string, senha: string)
{
    return new Usuario (idUsuario, nomeUsuario, email, senha);
}

module.exports = {novoUsuario}