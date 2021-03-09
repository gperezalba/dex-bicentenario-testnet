import { BigInt } from "@graphprotocol/graph-ts";
import { SetAllowance, SetAllowanceArray } from "../generated/DEXAllow/DEXAllow";
import { User } from "../generated/schema";

export function handleSetAllowance(event: SetAllowance): void {
    let array = event.params.indexes;

    if (array.includes(BigInt.fromI32(33))) {
        updateAllowance(event.params.sender.toHexString(), event.params.allowance);
    }

    if (array.includes(BigInt.fromI32(34))) {
        updateAllowancePackable(event.params.sender.toHexString(), event.params.allowance);
    }
}

export function handleSetAllowanceArray(event: SetAllowanceArray): void {

    let index = event.params.index;

    if (index == BigInt.fromI32(33)) {
        let array = event.params.senders;

        for (let i = 0; i < array.length; i++) {
            updateAllowance(array[i].toHexString(), event.params.allowance);
        }
    }

    if (index == BigInt.fromI32(34)) {
        let array = event.params.senders;

        for (let i = 0; i < array.length; i++) {
            updateAllowancePackable(array[i].toHexString(), event.params.allowance);
        }
    }
}

function updateAllowance(userAddr: string, allowance: boolean): void {
    let user = User.load(userAddr);

    if (user != null) {
        user.allowed = allowance;

        user.save();
    }
}

function updateAllowancePackable(userAddr: string, allowance: boolean): void {
    let user = User.load(userAddr);

    if (user != null) {
        user.allowedPackable = allowance;

        user.save();
    }
}