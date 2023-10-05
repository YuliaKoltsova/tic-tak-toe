const board = document.querySelector('.board'); // Игровое поле
const resetButton = document.querySelector('.reset-button'); // Кнопка сброса
const result = document.querySelector('.result'); // результат игры

let currentPlayer = 'X'; // Текущий игрок, начинающий с "X"
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Игровое поле 3x3
let gameActive = true; // Флаг, указывающий на активность игры

// Функция для создания ячейки игрового поля
const createCell = (index) => {
  const cell = document.createElement('div'); //Создаем клетку
  cell.classList.add('cell'); // Добавляем класс
  cell.dataset.index = index; // добавляем dataset-index
  cell.addEventListener('click', handleCellClick); // Добавляем обработчик клика
  return cell;
}

// Функция для отрисовки игрового поля
const renderBoard = () => {
  board.innerHTML = ''; // Очищаем игровое поле
  // Проходим по всем ячейкам игрового поля и создаем их
  gameBoard.forEach((symbol, index) => {
    const cell = createCell(index);
    cell.textContent = symbol; // Устанавливаем значение символа в ячейку
    board.appendChild(cell); // Добавляем ячейку в игровое поле
  });
}

// Обработчик клика по ячейке
const handleCellClick = (event) => {
  const index = event.target.dataset.index; // Получаем индекс ячейки
  if (gameBoard[index] === '' && gameActive) { // Проверка на пустую ячейку и активность игры
    gameBoard[index] = currentPlayer; // Устанавливаем символ текущего игрока в ячейку
    renderBoard(); // Обновляем отображение игрового поля
    if (checkWin(currentPlayer)) { // Проверяем на победу текущего игрока
      result.textContent = `Игрок ${currentPlayer} выиграл!`;
      gameActive = false; // Останавливаем игру
    } else if (!gameBoard.includes('')) { // Проверяем на ничью
      result.textContent = 'Ничья!';
      gameActive = false; // Останавливаем игру
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Переключаем текущего игрока
    }
  }
}
// Проверка на выигрыш и подсветка выигрышной комбинации
const checkWin = (player) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
    [0, 4, 8], [2, 4, 6] // Диагонали
  ];

  // Проверяем, есть ли победная комбинация для текущего игрока
  const winningPattern = winPatterns.find(pattern =>
    pattern.every(cell => gameBoard[cell] === player)
  );

  if (winningPattern) {
    // Подсвечиваем выигрышную комбинацию
    winningPattern.forEach(cellIndex => {
      const cell = document.querySelector(`[data-index="${cellIndex}"]`);
      cell.classList.add('winning-cell');
    });

    return true;
  }

  return false;
}


// Функция сброса игры
const resetGame = () => {
  currentPlayer = 'X'; // Игрок "X" начинает
  gameBoard = ['', '', '', '', '', '', '', '', '']; // Очищаем игровое поле
  gameActive = true; // Включаем игру
  renderBoard(); // Обновляем отображение игрового поля
  result.textContent = ''; // очищаем результат
}

resetButton.addEventListener('click', resetGame); // Обработчик сброса игры при клике на кнопку "Новая игра"

// Инициализируем игру
resetGame();