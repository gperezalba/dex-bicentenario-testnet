import { BigInt } from "@graphprotocol/graph-ts";
import { SetAllowance } from "../generated/DEXAllow/DEXAllow";
import { User } from "../generated/schema";

export function handleSetAllowance(event: SetAllowance): void {
    let user = User.load(event.params.sender.toHexString());

    if (user != null) {
        let array = event.params.indexes;

        if (array.includes(BigInt.fromI32(33))) {
            user.allowed = event.params.allowance;
        }

        if (array.includes(BigInt.fromI32(34))) {
            user.allowedPackable = event.params.allowance;
        }

        user.save();
    }
}