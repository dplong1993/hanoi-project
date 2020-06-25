class HanoiGame {
  constructor(towers = [[3, 2, 1], [], []]) {
    this.towers = towers;

  }

  isValidMove(startTowerIdx, endTowerIdx) {

    if(startTowerIdx === endTowerIdx) return false;
    if(endTowerIdx > this.towers.length - 1) return false;
    if(startTowerIdx > this.towers.length - 1) return false;

    let startingTower = this.towers[startTowerIdx];
    let diskToBeMoved = startingTower[startingTower.length -1];
    let endingTower = this.towers[endTowerIdx];
    let endingTowerDisk = endingTower[endingTower.length -1];

    if(startingTower.length === 0) return false;
    if(diskToBeMoved > endingTowerDisk) return false;

    if(endingTower.length === 0) return true;
    else if(endingTowerDisk > diskToBeMoved) return true;
    else return false;
  }

  move(startTowerIdx, endTowerIdx) {
    const isValid = this.isValidMove(startTowerIdx, endTowerIdx);


    if(isValid) {
      let startingTower = this.towers[startTowerIdx];
      let endingTower = this.towers[endTowerIdx];

      endingTower.push(startingTower.pop());
      return true;
    } else return false;
  }

  isWon() {
    if (this.towers[1].length === 3) return true;
    if (this.towers[2].length === 3) return true;
    else return false;

  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}
module.exports = HanoiGame;
