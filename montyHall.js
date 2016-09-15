var app = angular.module('montyHall', [])

app.controller('Doors', function ($scope, $timeout) {

    var clicks = 0;
    $scope.Math = window.Math //puts Math into the scope
    $scope.field = 'num'
    $scope.doorCount = 3
    $scope.doorStyle = { 'background-color': 'blue' }
    $scope.winCount = 0
    $scope.lossCount = 0
    $scope.stay = ' '
    $scope.winArray = [{ name: 'Stay', win: 0, loss: 0 }, { name: 'Switch', win: 0, loss: 0 }]

    $scope.doors = []

    $scope.instruct = 'Pick a door!'
    $timeout(function() {pymChild.sendHeight()},0)

    var initialClick;

    $scope.click = function ($index) {

        if ($scope.doors[$index].status != 'open') {
            if (clicks == 0) {

                //first click
                initialClick = $index
                var randomDoor;
                var openDoor;

                if ($scope.doors[$index].behind == 'car') {
                    randomDoor = getRandomIntNot(0, $scope.doors.length, $index)
                }
                $scope.doors = $scope.doors.map(function (d, i) {
                    if (i != $index && d.behind == 'goat' && i != randomDoor) {
                        d.status = 'open'
                    }
                    else {
                        d.label = 'SWITCH'
                    }

                    return d
                })
                $scope.doors[$index].label = 'STAY'
                clicks += 1
                $scope.instruct = 'You selected door #' + ($index + 1) +  '. We\'ve opened ' + ($scope.doorCount > 3 ? 'all the doors' : 'the door')+ ' the car is  NOT behind. Where is the car? Do you switch or stay?'
            }
            else if (clicks == 1) {
                //second click

                $scope.active = $index
                $scope.doors[$index].clicked = true

                if (initialClick == $index) {
                    $scope.stay = 'stay'
                    if ($scope.doors[$index].behind == 'car') {
                        $scope.winCount++
                        $scope.winArray[0].win++
                        $scope.instruct = 'You win an emoji car!'
                    }
                    else {
                        $scope.lossCount++
                        $scope.winArray[0].loss++
                        $scope.instruct = 'You are stuck with this goat!'
                    }
                }
                else {
                    $scope.stay = 'switch'
                    if ($scope.doors[$index].behind == 'car') {
                        $scope.winCount++
                        $scope.winArray[1].win++
                        $scope.instruct = 'You win an emoji car!'
                    }
                    else {
                        $scope.lossCount++
                        $scope.winArray[1].loss++
                        $scope.instruct = 'You are stuck with this goat!'
                    }
                }
                $scope.doors = $scope.doors.map(function (d, i) {
                    d.label = ''
                    d.status = 'open'
                    return d
                })
                clicks += 1
            }
            else { }
        }

    }

    $scope.doorInit = function () {

        $scope.doorCount >= 3 ? null : $scope.doorCount = 3

        $scope.doors = []
        $scope.active = null;
        clicks = 0
        $scope.instruct = 'Pick a door!'

        var carIndex = getRandomInt(0, $scope.doorCount)

        for (i = 0; i <= $scope.doorCount - 1; i++) {
            $scope.doors.push({ num: i + 1, behind: i == carIndex ? 'car' : 'goat', label: '', status: 'closed', clicked: false })
        }
        document.getElementById('ui-all').style.visibility = 'visible' //necessary to prevent weird looking load
    }
    $scope.doorInit()

    $scope.reset = function () {
        $scope.doors = []
        $scope.open = []
        $scope.active = null;
        clicks = 0
        alert()
    }

    $scope.updateHeight = function() {
        $scope.winCount = 0
        $scope.lossCount = 0
        $scope.winArray = [{ name: 'Stay', win: 0, loss: 0 }, { name: 'Switch', win: 0, loss: 0 }]

        $timeout(function() {pymChild.sendHeight()},0)
    }



})



var pymChild = new pym.Child()

// var out = {}
// for (i=0; i<10000; i++) {
//     var num = getRandomIntNot(0, 5, 2)
//     out[num] = (out[num]|| 0) + 1 
// }
// console.log(out)