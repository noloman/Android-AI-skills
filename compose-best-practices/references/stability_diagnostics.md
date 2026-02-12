# Stability & Recomposition Diagnostics

Check:
1) Mixed M2/M3
2) Missing Lazy keys
3) Allocations in recomposition
4) Unstable params (mutable collections, changing lambdas)
5) Wrong effect keys

Fix:
- stable keys
- remember/derivedStateOf
- move heavy work to state holder/VM
