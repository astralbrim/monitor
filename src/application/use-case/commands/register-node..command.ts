export class RegisterNodeCommand {
  constructor(
    public name: string,
    public controllerId: number,
    public clientId: number,
  ) {}
}
