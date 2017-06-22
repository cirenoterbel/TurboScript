import {WasmSectionBinary} from "../wasm-binary-section";
import {WasmSection} from "../../core/wasm-section";
import {ByteArray} from "../../../../utils/bytearray";
import {WasmFunction} from "../../core/wasm-function";
/**
 * Created by 01 on 2017-06-17.
 */
export class FunctionDeclarationSection extends WasmSectionBinary {
    functions: WasmFunction[];

    constructor(payload = new ByteArray()) {
        super(
            WasmSection.Function,
            payload.length,
            null, null,
            payload
        );
        this.functions = [];
    }

    read(): void {
        let functionCount: int32 = this.payload.readU32LEB();
        console.log(`WasmFunctionsDeclarations : ${functionCount}`);
        for (let i: int32 = 0; i < functionCount; i++) {
            let _function = new WasmFunction(null); // We don't know have the name of the function yet.
            _function.signatureIndex = this.payload.readU32LEB();
            this.functions.push(_function);
        }
    }

    publish(data: ByteArray): void {
        super.publish(data);
    }

    toString(): string {
        let str = "WasmFunctions[\n";
        this.functions.forEach(_function => {
            str += "  " + _function.toString() + "\n";
        });
        return str + "]\n";
    }
}
