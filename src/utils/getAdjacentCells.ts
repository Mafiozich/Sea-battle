export function getAdjacentCells(selectedIndex: number) {
    const rows = 5;
    const cols = 7;
    const row = Math.floor(selectedIndex / cols);
    const col = selectedIndex % cols;
    const adjacentIndices = [];

    // Все возможные смещения (8 направлений)
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1]
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        // Проверка на выход за границы
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            const index = newRow * cols + newCol;
            adjacentIndices.push(index);
        }
    }

    return adjacentIndices;
}