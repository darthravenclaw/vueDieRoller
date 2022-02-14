const app = Vue.createApp({
  data() {
    return {
      dice: [
        { name: "d4", value: 4, count: 0 },
        { name: "d6", value: 6, count: 0 },
        { name: "d8", value: 8, count: 0 },
        { name: "d10", value: 10, count: 0 },
        { name: "d12", value: 12, count: 0 },
        { name: "d20", value: 20, count: 0 },
      ],
      mod: 0,
      target: 4,
      results: "Your results will show here.",
      newDieName: "test",
      newDieValue: 4,
      showMain: true,
      expShow: "Show Description",
    };
  },
  methods: {
    showToggle() {
      if (this.expShow == "Show Description") {
        this.expShow = "Hide Description";
      } else {
        this.expShow = "Show Description";
      }
    },
    addCustomDieDialog() {
      this.newDieName = "";
      this.newDieValue = 4;
      this.showMain = false;
    },
    cancel() {
      this.showMain = true;
    },
    addDie() {
      console.log(this.newDieValue);
      console.log();
      if (
        this.newDieName != "" &&
        this.newDieValue > 1 &&
        !isNaN(this.newDieValue) &&
        !this.dice.some((die) => die.name == this.newDieName)
      ) {
        this.dice.push({
          name: this.newDieName,
          value: this.newDieValue,
          count: 0,
        });
      }
      this.showMain = true;
    },
    getResults() {
      return '<div class:"result" >' + this.results + "</div>";
    },
    upDie(dieText) {
      let die = this.dice.find((die) => die.name === dieText);
      die.count++;
    },
    downDie(dieText) {
      let die = this.dice.find((die) => die.name === dieText);
      die.count--;
    },
    rollDiceHigh() {
      let message = "You rolled ";
      const dice = this.dice.filter((die) => die.count > 0);
      for (let die of dice) {
        message += "<div class='dieCol'>";
        message +=
          "<span class='" + die.name + "ele'><b>" + die.name + ":</b></span> ";
        for (let i = 0; i < die.count; i++) {
          let roll = Math.floor(Math.random() * die.value) + 1;
          console.log(roll);
          if (roll < die.value) {
            message += "<span class='" + die.name + "ele'>" + roll + "</span> ";
          } else {
            let total = roll;
            let rolls = "[" + roll;
            while (roll == die.value) {
              roll = Math.floor(Math.random() * die.value) + 1;
              rolls += " " + roll;
              total += roll;
            }
            rolls += "]=" + total + " ";
            message +=
              "<span class='" +
              die.name +
              "ele ace'> Aced " +
              rolls +
              "</span> ";
          }
        }
        message += "</div>";
      }
      this.results = message;
    },
    rollDiceTotal() {
      let message = "You rolled ";
      let total = 0;
      const dice = this.dice.filter((die) => die.count > 0);
      for (let die of dice) {
        message += "<div class='dieLine'>";
        message +=
          "<span class='" + die.name + "ele'><b>" + die.name + ":</b></span> ";
        for (let i = 0; i < die.count; i++) {
          let roll = Math.floor(Math.random() * die.value) + 1;
          message += "<span class='" + die.name + "ele'>" + roll + "</span> ";
          console.log(roll);
          total += roll;
        }
        message += "</div>";
      }
      message += "<b>total:</b>  " + total;
      console.log(total);
      this.results = message;
    },
  },
});

app.mount("#app");
