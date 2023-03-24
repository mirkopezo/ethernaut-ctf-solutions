// SPDX-License-Identifier: MIT

object "MagicNumberAttack" {
    code {
        datacopy(0x00, dataoffset("runtime"), datasize("runtime"))
        return(0x00, datasize("runtime"))
    }

    object "runtime" {
        code {
            mstore(0, 0x2a)
            return(0, 0x20)
        }
    }
}
