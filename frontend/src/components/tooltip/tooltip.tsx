// Tooltip.tsx - Updated with tool-specific context
import React from 'react';
import './tooltip.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  optionValue?: string;
  optionType?: string;
  toolType?: 'mta' | 'saber' | 'ae';
  setPassedPrompt?: (prompt: string) => void;
}

// Define context for each tool - updated to match the natural style
const TOOL_CONTEXTS = {
  mta: `Here's some background about MTA (Multi-Threaded Analysis) to help with your explanation:

MTA is a static analysis tool that analyzes value-flow specifically in multi-threaded programs. It uses FSAM (Flow-Sensitive pointer Analysis Model) for efficient handling of large, complex C programs and performs sparse analysis with thread interference checks.

It's used to detect data races (when multiple threads access shared data without proper synchronization), evaluate lock safety (ensuring proper use of locks and synchronization primitives), and optimize multithreaded performance to improve efficiency and safety of concurrent code.`,

  saber: `Here's some background about SABER to help with your explanation:

SABER is a static memory leak detector for C programs, integrated into the Open64 compiler. It utilizes full-sparse value-flow analysis to track values from allocation (e.g., malloc) to release (e.g., free) and builds a Sparse Value-Flow Graph (SVFG). It works through four main phases: Pre-Analysis, Full-Sparse SSA Form Conversion, SVFG Construction, and Leak Detection via graph reachability.

It's used for high accuracy with fewer false positives in memory leak detection, reduces debugging time by catching memory issues early in development, and uses Binary Decision Diagrams (BDDs) to efficiently manage control-flow paths and reduce redundancy.`,

  ae: `Here's some background about AE (Abstract Execution) to help with your explanation:

AE is a static analysis tool that analyzes programs by examining variable states at each control point. It follows control flow to understand variable states in each statement and helps gather program semantics to identify potential issues.

It's used to detect various bugs like buffer overflows and null pointer dereferences, helps identify vulnerabilities by understanding data access and changes, and facilitates security checks while optimizing code based on variable usage patterns.`,
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  optionValue,
  optionType,
  toolType,
  setPassedPrompt,
}) => {
  // Function to handle Ask CodeGPT button click
  const handleAskCodeGPT = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (setPassedPrompt && optionValue && optionType) {
      // Determine context directly from the optionValue being clicked - just like graphs!
      let toolContext = '';

      // Check the optionValue to determine which context to use
      if (
        optionValue === 'mta' ||
        optionValue.includes('mta') ||
        optionValue.includes('Multi-Thread')
      ) {
        toolContext = TOOL_CONTEXTS.mta;
      } else if (
        optionValue === 'saber' ||
        optionValue.includes('saber') ||
        optionValue.includes('Memory Leak')
      ) {
        toolContext = TOOL_CONTEXTS.saber;
      } else if (
        optionValue === 'ae' ||
        optionValue.includes('ae') ||
        optionValue.includes('Buffer Overflow')
      ) {
        toolContext = TOOL_CONTEXTS.ae;
      } else {
        // For compile flags or other options
        toolContext =
          'Here is some general background about static analysis tools to help with your explanation: These tools analyze code to find potential issues, bugs, and optimization opportunities.';
      }

      const prompt = `${toolContext}

Explain what the ${optionType} "${optionValue}" does. Focus on:
- What is this executable and how does it work
- What specific problems or issues this option helps detect or solve
- When you should use this option vs when you shouldn't
- Any performance impact or trade-offs with this option

Keep the explanation concise and practical for students learning static analysis.`;

      setPassedPrompt(prompt);
    }
  };

  return (
    <div className="tooltip-container">
      <div className="tooltip-trigger">{children}</div>
      <div className="tooltip-content">
        {content}
        {setPassedPrompt && optionValue && (
          <div className="tooltip-button-container">
            <button onClick={handleAskCodeGPT} className="tooltip-button">
              <span style={{ marginRight: '5px' }}>💡</span>
              Ask CodeGPT for more details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
