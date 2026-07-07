"use client";

import { useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "@/store/gameStore";
import type { MatrixCell } from "@/types";
import { playCorrect } from "@/utils/audio";

const MATRIX_SIZE = 10;

export function TrainingMatrix() {
  const {
    cells,
    selectedCell,
    selectCell,
    setCellValue,
    submitSelectedCell,
    lastEffect,
  } = useGameStore(
    useShallow((state) => ({
      cells: state.cells,
      selectedCell: state.selectedCell,
      selectCell: state.selectCell,
      setCellValue: state.setCellValue,
      submitSelectedCell: state.submitSelectedCell,
      lastEffect: state.lastEffect,
    })),
  );

  useEffect(() => {
    if (lastEffect?.type === "answer-correct") {
      playCorrect();
    }
  }, [lastEffect]);

  function handleCellSubmit() {
    submitSelectedCell();
  }

  return (
    <section className="training-section" aria-label="乘法练习矩阵">
      <div className="training-layout">
        <div className="matrix-scroll">
          <div className="matrix-grid" role="grid" aria-label="乘法练习矩阵">
            <div className="matrix-corner" aria-hidden="true">
              ×
            </div>
            {Array.from({ length: MATRIX_SIZE }, (_, index) => (
              <HeaderCell
                key={`col-${index + 1}`}
                value={index + 1}
                active={selectedCell.col === index + 1}
                axis="column"
              />
            ))}
            {Array.from({ length: MATRIX_SIZE }, (_, rowIndex) => (
              <div className="contents" key={`row-${rowIndex + 1}`}>
                <HeaderCell
                  value={rowIndex + 1}
                  active={selectedCell.row === rowIndex + 1}
                  axis="row"
                />
                {cells
                  .filter((cell) => cell.row === rowIndex + 1)
                  .map((cell) => {
                    const isSelected =
                      selectedCell.row === cell.row &&
                      selectedCell.col === cell.col;
                    const isDiagonal = cell.row === cell.col;

                    return (
                      <MatrixCellButton
                        key={`${cell.row}-${cell.col}`}
                        cell={cell}
                        selected={isSelected}
                        inFocusBand={
                          selectedCell.row === cell.row ||
                          selectedCell.col === cell.col
                        }
                        diagonal={isDiagonal}
                        onSelect={selectCell}
                        onValueChange={setCellValue}
                        onSubmit={handleCellSubmit}
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderCell({
  value,
  active,
  axis,
}: {
  value: number;
  active: boolean;
  axis: "row" | "column";
}) {
  return (
    <div
      className={["matrix-header", active ? "is-active" : ""].join(" ")}
      role={axis === "row" ? "rowheader" : "columnheader"}
    >
      {value}
    </div>
  );
}

function MatrixCellButton({
  cell,
  selected,
  inFocusBand,
  diagonal,
  onSelect,
  onValueChange,
  onSubmit,
}: {
  cell: MatrixCell;
  selected: boolean;
  inFocusBand: boolean;
  diagonal: boolean;
  onSelect: (row: number, col: number) => void;
  onValueChange: (row: number, col: number, value: string) => void;
  onSubmit: () => void;
}) {
  function handleFocus() {
    onSelect(cell.row, cell.col);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const nextPosition = getArrowTarget(cell.row, cell.col, event.key);

    if (nextPosition) {
      event.preventDefault();
      onSelect(nextPosition.row, nextPosition.col);
      focusMatrixInput(nextPosition.row, nextPosition.col);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div
      role="gridcell"
      className={[
        "matrix-cell",
        diagonal
          ? "is-diagonal border-t-white/60 border-l-white/60 border-b-amber-700/80 border-r-amber-700/80 shadow-[2px_3px_6px_rgba(180,120,20,0.4)]"
          : "",
        selected ? "is-selected" : "",
        inFocusBand && !selected ? "is-in-band" : "",
        cell.isReadOnly ? "is-locked" : "",
        cell.isCorrect && diagonal
          ? "is-diagonal-correct border-t-white/60 border-l-white/60 border-b-amber-700/80 border-r-amber-700/80 shadow-[2px_3px_6px_rgba(180,120,20,0.4)]"
          : "",
        cell.isCorrect && !diagonal ? "is-correct" : "",
        cell.isSubmitted && !cell.isCorrect ? "is-incorrect" : "",
      ].join(" ")}
      onClick={() => onSelect(cell.row, cell.col)}
      aria-label={`${cell.row} 乘 ${cell.col}${
        cell.isReadOnly ? "，尚未解锁" : ""
      }`}
      aria-selected={selected}
    >
      {cell.isReadOnly ? (
        <LockIcon />
      ) : (
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          autoComplete="off"
          value={cell.userValue}
          readOnly={cell.isCorrect}
          data-row={cell.row}
          data-col={cell.col}
          aria-label={`${cell.row} 乘 ${cell.col} 的答案`}
          aria-invalid={cell.isSubmitted && !cell.isCorrect}
          placeholder="·"
          onFocus={handleFocus}
          onChange={(event) =>
            onValueChange(cell.row, cell.col, event.target.value)
          }
          onBlur={onSubmit}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}

function getArrowTarget(row: number, col: number, key: string) {
  if (key === "ArrowUp") return { row: Math.max(1, row - 1), col };
  if (key === "ArrowDown") return { row: Math.min(MATRIX_SIZE, row + 1), col };
  if (key === "ArrowLeft") return { row, col: Math.max(1, col - 1) };
  if (key === "ArrowRight") return { row, col: Math.min(MATRIX_SIZE, col + 1) };
  return null;
}

function focusMatrixInput(row: number, col: number) {
  window.requestAnimationFrame(() => {
    const target = document.querySelector<HTMLInputElement>(
      `.matrix-cell input[data-row="${row}"][data-col="${col}"]`,
    );
    target?.focus();
  });
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="5" y="9" width="10" height="8" rx="2" />
      <path d="M7.5 9V6.5a2.5 2.5 0 0 1 5 0V9" />
    </svg>
  );
}
