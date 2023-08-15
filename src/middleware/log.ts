module.exports = (req: any, res: any, next: any) => {
    console.log("> Recieved " + req.method + " request");
    console.time('> Request duration');

    next();

    console.timeEnd('> Request duration');
}