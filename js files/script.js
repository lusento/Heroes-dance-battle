/*          Описание игры            */

//объект настроек игры
const gameParameters = {
    MAX_LEVEL: 10, //максимальный уровень героя
    MAX_STAT: 55, //минимальный уровень параметра героя
    MIN_STAT: 10 //минимальный уровень параметка для умения
  };
  
  //обхект классов игры
  const gameClasses = {
    Mage: "Маг",
    Knight: "Рыцарь",
    Shooter: "Лучник",
    Hero: "Класс"
  };
 
  //объявление героя оппонента
  let enemyHero = null;
  
  //объявления героя игрока
  let playerHero = null;
  
  //добавление героя игрока на экран
const sendToBattleButton = document.getElementById("sendToBattleButton");
  
//действие героя игрока
const doSkillButton = document.getElementById("doSkillButton");
//добавляет +random кол-во к agi / str / int в зависимости от класса который выбрал игрок.
doSkillButton.onclick = () => {
  if (playerHero) {
    if (!playerHero.skillButtonClicked) {
      if (playerHero.constructor.name === "Mage") {
        playerHero.stats.int += getRandomValue(10, 35);
      } else if (playerHero.constructor.name === "Knight") {
        playerHero.stats.str += getRandomValue(10, 35);
      } else if (playerHero.constructor.name === "Archer") {
        playerHero.stats.agi += getRandomValue(10, 35);
      } else {
        console.error("Упс! Произошла какая-то ошибка!");
        return;
      }
      
      displayPlayerHero(playerHero);
      console.log(playerHero);

      playerHero.skillButtonClicked = true;
      doSkillButton.disabled = true;
    } else {
      console.error("Упс! Навык уже использован!");
    }
  } else {
    console.error("Упс! Герой игрока не выбран!");
  }
};

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  //вывод героя оппонента на экран
  const getEnemyButton = document.getElementById("getEnemyButton");
  
  //начало битвы
  const startBattleButton = document.getElementById("startBattleButton");
  
  /*          Ход игры            */
  
  //вывод героя игрока на экран
  function displayPlayerHero(hero) {
  const playerHeroClassElement = document.getElementById("playerHeroClass");
  const playerHeroNameElement = document.getElementById("playerHeroName");
  const playerHeroLevelElement = document.getElementById("playerHeroLevel");
  const playerHeroHpElement = document.getElementById("playerHeroHp");
  const playerHeroStrengthElement = document.getElementById("playerHeroStrength");
  const playerHeroIntelligenceElement = document.getElementById("playerHeroIntelligence");
  const playerHeroAgilityElement = document.getElementById("playerHeroAgility");

  if (hero.level <= 10) {
    playerHeroClassElement.innerHTML = gameClasses[hero.constructor.name];
    playerHeroNameElement.innerHTML = hero.name;
    playerHeroLevelElement.innerHTML = hero.level;
    playerHeroHpElement.innerHTML = hero.healthPoints;
    playerHeroStrengthElement.innerHTML = hero.stats.str;
    playerHeroIntelligenceElement.innerHTML = hero.stats.int;
    playerHeroAgilityElement.innerHTML = hero.stats.agi;
    hero.displayHero();
  } else {
    playerHeroClassElement.innerHTML = "Ошибка: уровень игрока превышает 10!";
    playerHeroNameElement.innerHTML = "";
    playerHeroLevelElement.innerHTML = "";
    playerHeroHpElement.innerHTML = "";
    playerHeroStrengthElement.innerHTML = "";
    playerHeroIntelligenceElement.innerHTML = "";
    playerHeroAgilityElement.innerHTML = "";
  }
}
  
  //вывод героя игрока на экран
  function displayEnemyHero(hero) {
    document.getElementById("enemyHeroClass").innerHTML =
      gameClasses[hero.constructor.name];
    document.getElementById("enemyHeroName").innerHTML = hero.name;
    document.getElementById("enemyHeroLevel").innerHTML = hero.level;
    document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;
  
    hero.displayHero();
  }

  //вывод героя игрока на экран
  function displayEnemyHero(hero) {
    document.getElementById("enemyHeroClass").innerHTML =
      gameClasses[hero.constructor.name];
    document.getElementById("enemyHeroName").innerHTML = hero.name;
    document.getElementById("enemyHeroLevel").innerHTML = hero.level;
    document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;
  
    hero.displayHero();
  }
  
  
  //получение информации героя игрока
  sendToBattleButton.onclick = () => {
    const heroName = document.getElementById("name").value;
    if (heroName !== "") {
      const heroClass = document.querySelector(
        'input[name="class"]:checked'
      ).value;
      const heroLevel = document.getElementById("level").value;
      const heroStats = {};
  
      //если введённое значение параметра больше максимального, устанавливаем максимальное
      heroStats.str = Number(document.getElementById("strength").value);
      if (heroStats.str > gameParameters.MAX_STAT) {
        heroStats.str = gameParameters.MAX_STAT;
      }
      heroStats.int = Number(document.getElementById("intelligence").value);
      if (heroStats.int > gameParameters.MAX_STAT) {
        heroStats.int = gameParameters.MAX_STAT;
      }
      heroStats.agi = Number(document.getElementById("agility").value);
      if (heroStats.agi > gameParameters.MAX_STAT) {
        heroStats.agi = gameParameters.MAX_STAT;
      }
  
      const additionalAbility = document.querySelector(
        'input[name="additionalAbility"]:checked'
      ).value;
      const additionalStat = document.getElementById("additionalStat").value;
  if (heroClass === "Mage") {
        playerHero = new Mage(
          heroName,
          heroLevel,
          100,
          heroStats,
          additionalAbility,
          additionalStat
        );
      } else if (heroClass === "Knight") {
        playerHero = new Knight(
          heroName,
          heroLevel,
          100,
          heroStats,
          additionalAbility,
          additionalStat
        );
      } else if (heroClass === "Archer") {
        playerHero = new Archer(
          heroName,
          heroLevel,
          100,
          heroStats,
          additionalAbility,
          additionalStat
        );
      } else {
        console.error("Упс! Произошла какая-то ошибка!");
        return;
      }
        
      displayPlayerHero(playerHero);
  
      getEnemyButton.removeAttribute("disabled");
      doSkillButton.removeAttribute("disabled");
    } else {
      alert("Заполните все поля!");
    }
  };
  
  getEnemyButton.onclick = () => {
    //получение героя оппонента с сервера
    fetch(`https://api-code.practicum-team.ru/heroes`)
      .then((response) => response.json())
      .then((data) => {
        let randomEnemy = data[Math.floor(Math.random() * data.length)]; //получение случайного героя оппонента
        console.log(randomEnemy); //вывод героя оппонента в консоль
  
        //создаём экземпляр класса героя оппонента
        enemyHero = new Hero(
          randomEnemy.title, //имя героя
          Math.floor(Math.random() * 10) + 1, //уровень героя
          randomEnemy.hp, //запас сил героя
          {
            str: randomEnemy.str,
            int: randomEnemy.int,
            agi: randomEnemy.agi
          }
        ); //параметры героя
  
        //заполняем карточку героя оппонента
        displayEnemyHero(enemyHero);
  
        if (playerHero) {
          startBattleButton.removeAttribute("disabled");
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  
  function countStatsSum(hero) {
  let sum = 0;
  for (let stat in hero.stats) {
    sum += hero.stats[stat];
  }
  return sum;
}

function arena(firstHero, secondHero) {
  const winnerLabel = document.getElementById('winnerLabel');

  let winner = null;
  let fistHeroSum = countStatsSum(firstHero);
  let secondHeroSum = countStatsSum(secondHero);

  if (fistHeroSum > secondHeroSum) {
    winner = firstHero;
  } else if (fistHeroSum < secondHeroSum) {
    winner = secondHero;
  }

  if (winner) {
    winnerLabel.textContent = `Поздравляем победителя: ${winner.name}`;
  } else {
    winnerLabel.textContent = "В танцевальном баттле победила дружба!";
  }

  setTimeout(() => {
    winnerLabel.textContent = "Heroes Dance Battle 💃";
  }, 6000);
}

startBattleButton.onclick = () => {
  if (playerHero && enemyHero) {
    arena(playerHero, enemyHero);
  }
};
