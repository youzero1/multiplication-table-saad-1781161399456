import { useState } from 'react';
import clsx from 'clsx';
import { Search, Grid3X3, TableIcon } from 'lucide-react';

type ViewMode = 'full' | 'single';

export default function TablePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);
  const [searchA, setSearchA] = useState<string>('');
  const [searchB, setSearchB] = useState<string>('');

  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  const isHighlightedRow = (row: number) =>
    highlightedCell !== null && highlightedCell.row === row;
  const isHighlightedCol = (col: number) =>
    highlightedCell !== null && highlightedCell.col === col;
  const isHighlightedCell = (row: number, col: number) =>
    highlightedCell !== null &&
    highlightedCell.row === row &&
    highlightedCell.col === col;

  const searchResult =
    searchA !== '' && searchB !== ''
      ? parseInt(searchA) * parseInt(searchB)
      : null;
  const searchANum = parseInt(searchA);
  const searchBNum = parseInt(searchB);
  const searchValid =
    !isNaN(searchANum) &&
    !isNaN(searchBNum) &&
    searchANum >= 1 &&
    searchANum <= 9 &&
    searchBNum >= 1 &&
    searchBNum <= 9;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
            Table of 9×9
          </h1>
          <p className="text-gray-400 text-lg">Interactive Multiplication Table</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          {/* View Toggle */}
          <div className="flex gap-2 bg-gray-900 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setViewMode('full')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                viewMode === 'full'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <Grid3X3 size={16} />
              Full Table
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                viewMode === 'single'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <TableIcon size={16} />
              Single Table
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="number"
              min={1}
              max={9}
              placeholder="A (1-9)"
              value={searchA}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchA(e.target.value)}
              className="w-20 bg-transparent text-white text-sm outline-none placeholder-gray-600"
            />
            <span className="text-gray-500 font-bold">×</span>
            <input
              type="number"
              min={1}
              max={9}
              placeholder="B (1-9)"
              value={searchB}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchB(e.target.value)}
              className="w-20 bg-transparent text-white text-sm outline-none placeholder-gray-600"
            />
            {searchValid && searchResult !== null && (
              <span className="ml-2 text-indigo-400 font-bold text-sm">
                = {searchResult}
              </span>
            )}
          </div>
        </div>

        {/* Single Table Selector */}
        {viewMode === 'single' && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {numbers.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNumber(n)}
                className={clsx(
                  'w-10 h-10 rounded-lg font-bold text-sm transition-all',
                  selectedNumber === n
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {/* Full Table */}
        {viewMode === 'full' && (
          <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-900 p-3 text-center">
                    <span className="text-indigo-400 font-black text-lg">×</span>
                  </th>
                  {numbers.map((col) => (
                    <th
                      key={col}
                      className={clsx(
                        'p-3 text-center font-bold text-sm transition-colors',
                        isHighlightedCol(col)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-900 text-indigo-300 hover:bg-gray-800'
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {numbers.map((row) => (
                  <tr key={row}>
                    <td
                      className={clsx(
                        'p-3 text-center font-bold text-sm transition-colors',
                        isHighlightedRow(row)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-900 text-indigo-300'
                      )}
                    >
                      {row}
                    </td>
                    {numbers.map((col) => {
                      const result = row * col;
                      const isActive = isHighlightedCell(row, col);
                      const isRowOrCol = isHighlightedRow(row) || isHighlightedCol(col);
                      const isSearchMatch =
                        searchValid &&
                        ((row === searchANum && col === searchBNum) ||
                          (row === searchBNum && col === searchANum));

                      return (
                        <td
                          key={col}
                          onMouseEnter={() =>
                            setHighlightedCell({ row, col })
                          }
                          onMouseLeave={() => setHighlightedCell(null)}
                          className={clsx(
                            'p-3 text-center text-sm font-semibold cursor-pointer transition-all select-none',
                            isActive
                              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-105 rounded-lg shadow-lg shadow-indigo-500/40 text-base font-black z-10 relative'
                              : isSearchMatch
                              ? 'bg-pink-600/80 text-white font-black'
                              : isRowOrCol
                              ? 'bg-indigo-900/60 text-indigo-200'
                              : result % 2 === 0
                              ? 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                              : 'bg-gray-950 text-gray-400 hover:bg-gray-800'
                          )}
                        >
                          {result}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Single Table View */}
        {viewMode === 'single' && (
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-center">
                <h2 className="text-3xl font-black text-white">
                  Table of {selectedNumber}
                </h2>
              </div>
              <div className="divide-y divide-gray-800">
                {numbers.map((multiplier) => {
                  const result = selectedNumber * multiplier;
                  const isSearchMatch =
                    searchValid &&
                    ((selectedNumber === searchANum && multiplier === searchBNum) ||
                      (selectedNumber === searchBNum && multiplier === searchANum));
                  return (
                    <div
                      key={multiplier}
                      className={clsx(
                        'flex items-center justify-between px-6 py-4 transition-colors',
                        isSearchMatch
                          ? 'bg-pink-900/40 border-l-4 border-pink-500'
                          : 'hover:bg-gray-800/60'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-sm font-bold">
                          {selectedNumber}
                        </span>
                        <span className="text-gray-400 font-bold">×</span>
                        <span className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center text-sm font-bold">
                          {multiplier}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">=</span>
                        <span
                          className={clsx(
                            'text-2xl font-black',
                            isSearchMatch
                              ? 'text-pink-400'
                              : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'
                          )}
                        >
                          {result}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-gray-500">
          {viewMode === 'full' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-indigo-900/60"></div>
                <span>Hover row/column highlight</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                <span>Active cell</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-pink-600"></div>
            <span>Search result</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-700 text-xs">
          <p>Hover over cells to highlight rows &amp; columns • Use the search to find a product</p>
        </div>
      </div>
    </div>
  );
}
