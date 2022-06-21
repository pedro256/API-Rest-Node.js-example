class AppError{

    public readonly message:string;
    public readonly status:number;

    constructor(
        message="No Message",
        status=400
    ){
        this.message = message;
        this.status = status;
    }

}
