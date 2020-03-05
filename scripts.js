
$(document).ready(function () {


    //adaptation of https://codinglawyer.blogspot.it/2016/05/javascript-calculator-guide-part-1-lets_44.html

    //clicked categories
    var clickedType = {
        NUM: 1,
        DOT: 2,
        OP: 3,
        CE: 4,
        EQ: 5
    }

    //states
    var states = {
        START: 1,
        FIRST_NUM: 2,
        FIRST_NUM_FLOAT: 3,
        OP: 4,
        SECOND_NUM: 5,
        SEC_NUM_FLOAT: 6,
        SEC_NUM_DOT: 7,
        EQ: 8
    }

    $("#display").text(0);

    var calc = {
        state: states.START,
        current_op: "",
        on_display_now: "",
        num1: "",
        num: "",

        doStep: function (but_class, but_value) {
            switch (this.state) {


                case states.START:
                    if (but_class === clickedType.NUM) {
                        //display key
                        this.displaylcdSet(but_value);
                        //move to the next state
                        this.state = states.FIRST_NUM;
                    }
                    if (but_class === clickedType.DOT) {
                        this.displaylcdSet("0.");
                        this.state = states.FIRST_NUM_FLOAT;
                    }
                    break;


                case states.FIRST_NUM:
                    if (but_class === clickedType.NUM) {
                        this.displaylcdAppend(but_value);
                        this.state = states.FIRST_NUM;
                    }
                    if (but_class === clickedType.OP) {
                        this.current_op = but_value;
                        //store value of the displaylcd in a num1 variable in order to be able to store second number in the displaylcd
                        this.num1 = this.on_display_now;
                        this.state = states.OP;
                    }
                    if (but_class === clickedType.DOT) {
                        this.displaylcdAppend(but_value);
                        this.state = states.FIRST_NUM_FLOAT;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        calc.state = states.START;
                    }
                    break;



                case states.FIRST_NUM_FLOAT:
                    if (but_class === clickedType.NUM) {
                        this.displaylcdAppend(but_value);
                        this.state = states.FIRST_NUM_FLOAT;
                    }
                    if (but_class === clickedType.EQ) {
                        this.current_op = but_value;
                        ////store value of the displaylcd in a num1 variable in order to be able to store second number in the displaylcd
                        this.num1 = this.on_display_now;
                        this.state = states.EQ;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        calc.state = states.START;
                    }
                    break;


                case states.OP:
                    if (but_class === clickedType.NUM) {
                        this.displaylcdSet(but_value);
                        this.state = states.SECOND_NUM;
                    }
                    if (but_class === clickedType.DOT) {
                        this.displaylcdSet("0.");
                        this.state = states.SEC_NUM_DOT;
                    }
                    break;


                case states.SECOND_NUM:
                    if (but_class === clickedType.DOT) {
                        this.displaylcdAppend(but_value);
                        this.state = states.SEC_NUM_FLOAT;
                    }
                    if (but_class === clickedType.NUM) {
                        this.displaylcdAppend(but_value);
                        this.state = states.SECOND_NUM;
                    }
                    if (but_class === clickedType.EQ) {
                        //store the second number in the num2 variable so that we can use it if the equal sign is pressed more than once
                        this.num2 = this.on_display_now;
                        //calculate the result
                        this.operation(this.num1, this.on_display_now);
                        this.displaylcdUpdate(this.on_display_now);
                        this.state = states.EQ;
                    }
                    if (but_class === clickedType.OP) {
                        //calculate the result
                        this.operation(this.num1, this.on_display_now);
                        this.current_op = but_value;
                        //store the result of the operation in the num1 in order to be used in the next operation
                        this.num1 = this.displaylcd;
                        this.displaylcdUpdate(this.on_display_now);
                        this.state = states.OP;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        calc.state = states.EQ;
                    }
                    break;



                case states.SEC_NUM_FLOAT:
                    if (but_class === clickedType.NUM) {
                        this.displaylcdAppend(but_value);
                        this.state = states.SEC_NUM_FLOAT;
                    }
                    if (but_class === clickedType.EQ) {
                        this.num2 = this.on_display_now;
                        this.operation(this.num1, this.on_display_now);
                        this.displaylcdUpdate(this.on_display_now);
                        this.state = states.EQ;
                    }
                    if (but_class === clickedType.OP) {
                        this.operation(this.num1, this.on_display_now);
                        this.current_op = but_value;
                        this.num1 = this.on_display_now;
                        this.displaylcdUpdate(this.on_display_now);
                        this.state = states.OP;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        calc.state = states.OP;
                    }
                    break;
                case states.SEC_ARG_DOT:
                    if (but_class === clickedType.NUM) {
                        this.displaylcdAppend(but_value);
                        this.state = states.SEC_NUM_FLOAT;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        calc.state = states.OP;
                    }
                    break;
                case states.EQ:
                    if (but_class === clickedType.EQ) {
                        this.operation(this.on_display_now, this.num2);
                        this.displaylcdUpdate(this.on_display_now);
                        this.state = states.EQ;
                    }
                    if (but_class === clickedType.NUM) {
                        this.displaylcdSet(but_value);
                        this.state = states.FIRST_ARG;
                    }
                    if (but_class === clickedType.OP) {
                        this.current_op = but_value;
                        this.num1 = this.on_display_now;
                        this.state = states.OP;
                    }
                    if (but_class === clickedType.DOT) {
                        this.displaylcdSet("0.");
                        this.state = states.FIRST_ARG_FLOAT;
                    }
                    if (but_class === clickedType.CE) {
                        this.displaylcdSet("0");
                        this.clearer();
                    }
                    break;

            }
        },


        //does all the arithmetical operations
        operation: function (first, sec) {
            if (this.current_op === "÷") {
                this.on_display_now = first / sec;
            }
            if (this.current_op === "-") {
                this.on_display_now = first - sec;
            }
            if (this.current_op === "x") {
                this.on_display_now = first * sec;
            }
            if (this.current_op === "+") {
                this.on_display_now = Number(first) + Number(sec);
            }

        },


        //restarts the calculator to the default state
        clearer: function () {
            $("#display").text(0);
            this.state = states.START;
            this.current_op;
            this.on_display_now;
            this.num1;
            this.num2;
        },

        //appends a display var
        displaylcdAppend: function (key) {
            this.on_display_now += key;
            this.displaylcdUpdate(this.on_display_now);
        },

        //set a new value to the display var
        displaylcdSet: function (key) {
            this.on_display_now = key;
            this.displaylcdUpdate(this.on_display_now);
        },
        //display var
        displaylcdUpdate: function (dispText) {
            $("#display").text(dispText);
        }

    }


    //when the number is clicked
    $(".digit").on("click", function () {
        calc.doStep(clickedType.NUM, $(this).html());
    })
    //when the operator is clicked
    $(".operatorBtn").on("click", function () {
        calc.doStep(clickedType.OP, $(this).html());

    })


    $(".equals").on("click", function () {
        calc.doStep(clickedType.EQ, $(this).html());
    })

    $(".point").on("click", function () {
        calc.doStep(clickedType.DOT, $(this).html());
    })
    $(".allClear").on("click", function () {
        calc.clearer();
    })

    //when CE clicked - erase the last entered input

    $(".clearEntry").on("click", function () {
        calc.doStep(clickedType.CE, $(this).html());
    })

    //default state of calculator
    $("#display").text(0);



});