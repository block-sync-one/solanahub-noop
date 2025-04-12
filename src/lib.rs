#![no_std]

use pinocchio::{
    account_info::AccountInfo, no_allocator, nostd_panic_handler, program_entrypoint,
    pubkey::Pubkey, ProgramResult,
};
use pinocchio_log::log;

pinocchio_pubkey::declare_id!("GBtuxMi2Y2V5YJbRihrCFgxph23VvEhrHFQsbAwVZgt5");

// This is the entrypoint for the program.
program_entrypoint!(process_instruction);
//Do not allocate memory.
no_allocator!();
// Use the no_std panic handler.
nostd_panic_handler!();

#[inline(always)]
fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    log!("Solana Hub Noop");
    Ok(())
}
