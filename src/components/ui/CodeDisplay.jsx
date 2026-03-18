import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RAW_LINES = [
    { tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'developer' }, { t: 'op', v: ' = {' }] },
    { tokens: [{ t: 'key', v: '  name' }, { t: 'op', v: ': ' }, { t: 'str', v: "'Paras Pathania'" }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'key', v: '  role' }, { t: 'op', v: ': ' }, { t: 'str', v: "'SDE & Full Stack Dev'" }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'key', v: '  skills' }, { t: 'op', v: ': [' }] },
    { tokens: [{ t: 'str', v: "    'Java'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'React'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'Node.js'" }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'str', v: "    'PHP'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'MySQL'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'Docker'" }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'op', v: '  ],' }] },
    { tokens: [{ t: 'key', v: '  openToWork' }, { t: 'op', v: ': ' }, { t: 'bool', v: 'true' }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'key', v: '  location' }, { t: 'op', v: ': ' }, { t: 'str', v: "'India 🇮🇳'" }, { t: 'op', v: ',' }] },
    { tokens: [{ t: 'op', v: '};' }] },
    { tokens: [] },
    { tokens: [{ t: 'comment', v: '// Current mission:' }] },
    { tokens: [{ t: 'keyword', v: 'console' }, { t: 'op', v: '.' }, { t: 'fn', v: 'log' }, { t: 'op', v: '(' }, { t: 'str', v: "'Building awesome things 🚀'" }, { t: 'op', v: ')' }] },
];

const TOKEN_COLORS = {
    keyword: '#a78bfa',
    var: '#38bdf8',
    key: '#7dd3fc',
    str: '#34d399',
    op: '#94a3b8',
    bool: '#fb923c',
    comment: '#475569',
    fn: '#facc15',
};

const FULL_TEXT = RAW_LINES.map(line =>
    line.tokens.map(t => t.v).join('')
).join('\n');

const CodeDisplay = () => {
    const [charCount, setCharCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (charCount >= FULL_TEXT.length) { setDone(true); return; }
        const id = setTimeout(() => setCharCount(c => c + (Math.random() > 0.7 ? 2 : 1)), 28);
        return () => clearTimeout(id);
    }, [charCount]);

    // Rebuild lines from charCount
    let remaining = charCount;
    const visibleLines = RAW_LINES.map(line => {
        const lineText = line.tokens.map(t => t.v).join('');
        if (remaining <= 0) return { tokens: [], partial: '' };
        if (remaining >= lineText.length) {
            remaining -= lineText.length + 1; // +1 for \n
            return { tokens: line.tokens, partial: null };
        }
        // partial line
        const partial = lineText.slice(0, remaining);
        remaining = 0;
        return { tokens: line.tokens, partial };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-full max-w-lg relative"
            style={{ filter: 'drop-shadow(0 0 40px rgba(20,184,166,0.15))' }}
        >
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.4), rgba(99,102,241,0.3), rgba(52,211,153,0.2))',
                borderRadius: 16,
                filter: 'blur(1px)',
            }} />

            <div className="relative rounded-2xl overflow-hidden" style={{
                background: 'rgba(3,13,16,0.95)',
                border: '1px solid rgba(20,184,166,0.2)',
                backdropFilter: 'blur(12px)',
            }}>
                {/* IDE title bar */}
                <div className="flex items-center gap-3 px-4 py-3" style={{
                    background: 'rgba(5,13,18,0.9)',
                    borderBottom: '1px solid rgba(20,184,166,0.12)',
                }}>
                    <div className="flex gap-1.5">
                        {['#ef4444', '#eab308', '#22c55e'].map(c => (
                            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                        ))}
                    </div>
                    {/* File tab */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md ml-2" style={{
                        background: 'rgba(20,184,166,0.1)',
                        border: '1px solid rgba(20,184,166,0.2)',
                        borderBottom: '2px solid #14b8a6',
                    }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: '#facc15' }} />
                        <span className="text-xs font-mono text-slate-300">profile.ts</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#14b8a6' }} />
                        <span className="text-[10px] font-mono text-slate-500">TypeScript</span>
                    </div>
                </div>

                {/* Code area */}
                <div className="flex text-sm font-mono leading-6 p-4 overflow-x-auto" style={{ minHeight: 280 }}>
                    {/* Line numbers */}
                    <div className="pr-4 text-right select-none" style={{
                        color: 'rgba(148,163,184,0.3)',
                        borderRight: '1px solid rgba(20,184,166,0.1)',
                        minWidth: 28,
                    }}>
                        {RAW_LINES.map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>

                    {/* Code lines */}
                    <div className="pl-4">
                        {visibleLines.map((line, li) => {
                            if (line.partial !== null) {
                                // Render partial text (no syntax highlight)
                                return (
                                    <div key={li}>
                                        <span style={{ color: '#e2e8f0' }}>{line.partial}</span>
                                        {!done && <span className="inline-block w-[2px] h-4 ml-[1px] align-middle animate-pulse" style={{ background: '#14b8a6' }} />}
                                    </div>
                                );
                            }
                            if (line.tokens.length === 0) return <div key={li}>&nbsp;</div>;
                            return (
                                <div key={li}>
                                    {line.tokens.map((tok, ti) => (
                                        <span key={ti} style={{ color: TOKEN_COLORS[tok.t] || '#e2e8f0' }}>{tok.v}</span>
                                    ))}
                                </div>
                            );
                        })}
                        {done && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] font-mono text-teal-400">▶ Compiled successfully</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1.5" style={{
                    background: 'rgba(20,184,166,0.12)',
                    borderTop: '1px solid rgba(20,184,166,0.12)',
                }}>
                    <span className="text-[10px] font-mono text-teal-400">⎇ main</span>
                    <span className="text-[10px] font-mono text-slate-500">Ln {RAW_LINES.length}, Col 1</span>
                    <span className="text-[10px] font-mono text-teal-400">UTF-8</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CodeDisplay;
