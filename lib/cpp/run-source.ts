import { Result, Options, errorResultCallback } from "../types";
import { multipleArgsCallbackifier } from "../helper";
import { compileCSource } from "./compile-source";
import { runExecutable } from "../executable/execute-executable";

/**
 * Runs a Cpp source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 * @param callback
 */
export function runCppSource(sourceCode: string, options: Options, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param callback
 */
export function runCppSource(sourceCode: string, callback: errorResultCallback): Promise<Result>;

/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 */
export function runCppSource(sourceCode: string, options?: Options): Promise<Result>;

export async function runCppSource(sourceCode: string, ...args: any[]): Promise<Result> {
    return multipleArgsCallbackifier<Result>(sourceCode, runCppFileAndReturnPromise, ...args);
}

export async function runCppFileAndReturnPromise(sourceCode: string, options?: Options): Promise<Result> {
    let executablePath = await compileCSource(sourceCode, options);
    return runExecutable(executablePath, options);
}