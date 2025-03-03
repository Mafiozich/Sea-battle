export function getAdjacentCells(selectedIndex: number) {
    // const totalCells = 35;
    const cols = 7;

    const row = Math.floor(selectedIndex / cols);
    const col = selectedIndex % cols;
    const adjacentIndices: number[] = [];

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1 ],          [ 0, 1],
        [1, -1 ], [ 1, 0], [ 1, 1],
    ];

    directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
            newRow >= 0 && newRow < 5 &&
            newCol >= 0 && newCol < cols
        ) {
            const index = newRow * cols + newCol;
            adjacentIndices.push(index);
        }
    })

    return adjacentIndices;
}