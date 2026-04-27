(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/store/arenaStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useArenaStore",
    ()=>useArenaStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useArenaStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        /* Prediction inputs */ price: 0.1420,
        stake: 500,
        setPrice: (price)=>{
            set({
                price
            });
            // Recalculate multiplier based on deviation from current price
            const currentPrice = 0.1430;
            const deviation = Math.abs(price - currentPrice) / currentPrice;
            const multiplier = Math.max(1.1, Math.min(12.0, 1.5 + deviation * 50));
            set({
                multiplier: Math.round(multiplier * 10) / 10
            });
        },
        setStake: (stake)=>set({
                stake
            }),
        /* Round metadata */ currentRound: 402,
        roundEndTime: Date.now() + 4 * 60 * 60 * 1000 + 12 * 60 * 1000 + 45 * 1000,
        totalPool: 125000,
        activeUsers: 12482,
        /* Strategy */ status: 'leading',
        setStatus: (status)=>set({
                status
            }),
        multiplier: 3.2,
        /* Wallet (mock) */ wallet: {
            connected: false,
            address: null,
            balance: 0
        },
        connectWallet: ()=>set({
                wallet: {
                    connected: true,
                    address: 'GC72MQYK...45D2',
                    balance: 14520.45
                }
            }),
        disconnectWallet: ()=>set({
                wallet: {
                    connected: false,
                    address: null,
                    balance: 0
                }
            }),
        /* Arena action */ isEntering: false,
        enterArena: ()=>{
            set({
                isEntering: true
            });
            setTimeout(()=>{
                set({
                    isEntering: false
                });
            }, 2500);
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/wallet/WalletConnectButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletConnectButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/arenaStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function WalletConnectButton() {
    _s();
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"])({
        "WalletConnectButton.useArenaStore[wallet]": (s)=>s.wallet
    }["WalletConnectButton.useArenaStore[wallet]"]);
    const connectWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"])({
        "WalletConnectButton.useArenaStore[connectWallet]": (s)=>s.connectWallet
    }["WalletConnectButton.useArenaStore[connectWallet]"]);
    const disconnectWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"])({
        "WalletConnectButton.useArenaStore[disconnectWallet]": (s)=>s.disconnectWallet
    }["WalletConnectButton.useArenaStore[disconnectWallet]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: !wallet.connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            onClick: connectWallet,
            className: "btn-secondary flex items-center gap-2 text-sm",
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            exit: {
                opacity: 0,
                scale: 0.9
            },
            whileHover: {
                scale: 1.03
            },
            whileTap: {
                scale: 0.97
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse-dot"
                }, void 0, false, {
                    fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this),
                "Connect Wallet"
            ]
        }, "connect", true, {
            fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
            lineNumber: 14,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            onClick: disconnectWallet,
            className: "flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all",
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            exit: {
                opacity: 0,
                scale: 0.9
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-[#00f990]"
                }, void 0, false, {
                    fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-display font-semibold text-[#dbfcff] block",
                            children: wallet.address
                        }, void 0, false, {
                            fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-[#849495]",
                            children: [
                                wallet.balance.toLocaleString(),
                                " XLM"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            ]
        }, "connected", true, {
            fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
            lineNumber: 28,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/wallet/WalletConnectButton.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(WalletConnectButton, "CFcsdyiMf7MDJvhGcFwZgOEDQGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$arenaStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useArenaStore"]
    ];
});
_c = WalletConnectButton;
var _c;
__turbopack_context__.k.register(_c, "WalletConnectButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wallet$2f$WalletConnectButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wallet/WalletConnectButton.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
const NAV_ITEMS = [
    {
        label: 'Arena',
        href: '/',
        active: true
    },
    {
        label: 'Markets',
        href: '#',
        active: false
    },
    {
        label: 'Governance',
        href: '#',
        active: false
    }
];
function Navbar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
        className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0d1515]/70 border-b border-white/[0.06]",
        initial: {
            y: -80
        },
        animate: {
            y: 0
        },
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-3 group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#BD00FF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-bold text-sm",
                                children: "LA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-display text-lg font-bold text-[#dbfcff] tracking-tight",
                            children: "Liquidity Arena"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1",
                    children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${item.active ? 'text-[#00F0FF] bg-[#00F0FF]/8' : 'text-[#849495] hover:text-[#b9cacb] hover:bg-white/[0.04]'}`,
                            children: item.label
                        }, item.label, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wallet$2f$WalletConnectButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/Navbar.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0_kqycu._.js.map