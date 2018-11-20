function CollisionDetectionSquares(obj1, obj2) {

	obj1Middle = createVector(obj1.pos.x + obj1.side/2, obj1.pos.y + obj1.side/2);
	obj2Middle = createVector(obj2.pos.x + obj2.side/2, obj2.pos.y + obj2.side/2);
	deltaY = Math.abs((obj2Middle.y - obj1Middle.y));
	deltaX = Math.abs((obj2Middle.x - obj1Middle.x));


	this.update = function() {
		obj1Middle = createVector(obj1.pos.x + obj1.side/2, obj1.pos.y + obj1.side/2);
		obj2Middle = createVector(obj2.pos.x + obj2.side/2, obj2.pos.y + obj2.side/2);

		deltaY = Math.abs((obj2Middle.y - obj1Middle.y));
	 	deltaX = Math.abs((obj2Middle.x - obj1Middle.x));
	 	if (deltaY < 1 && deltaX < 1) {
			deltaY = 1;
			deltaX = 1;
		}

		trueDeltaY = obj2Middle.y - obj1Middle.y
		trueDeltaX = obj2Middle.x - obj1Middle.x


		//Delta correction so that the moving rectangle wont get caught on edges
		if (trueDeltaY == obj1.side/2 + obj2.side/2) {
			trueDeltaY += 0.000001;
		} else if (trueDeltaY == -(obj1.side/2 + obj2.side/2)) {
			trueDeltaY -= 0.000001;
		}

		if (trueDeltaX == obj1.side/2 + obj2.side/2) {
			trueDeltaX += 0.000001;
		} else if (trueDeltaX == -(obj1.side/2 + obj2.side/2)) {
			trueDeltaX -= 0.000001;
		}


		if (trueDeltaY < -(obj1.side/2 + obj2.side/2)) {
			this.collisionSide = "down";
		} else if (trueDeltaY > obj1.side/2 + obj2.side/2) {
			this.collisionSide = "up";
		}

		if (trueDeltaX < -(obj1.side/2 + obj2.side/2)) {
			this.collisionSide = "right";
		} else if (trueDeltaX > obj1.side/2 + obj2.side/2) {
			this.collisionSide = "left";
		}

	}



	//	THIS FUNCTION CALCULATES THE MOVING RECTS "IN BOX LINE" AND MULTIPLIES IT BY 2, NEED TO CALCULATE THE OTHER BOXE'S "IN BOX LINE"

	//line(obj1Middle.x, obj1Middle.y, obj2Middle.x, obj2Middle.y);

	vectorLine = obj2Middle.sub(obj1Middle);
	if (deltaX < obj1.side/2 + obj2.side/2 || deltaY > obj1.side/2 + obj2.side/2) {
		vectorLineAngle = degrees(atan(deltaX/deltaY))
	} else {
		vectorLineAngle = degrees(atan(deltaY/deltaX));
	}


	//Converting to angleMode DEGREES so the cos() function can handle the cosine of the angle calculation
	angleMode(DEGREES);
	vectorLineInBoxLengthObj1 = ( (obj1.side/2) / cos(vectorLineAngle) );
	vectorLineInBoxLengthObj2 = ( (obj2.side/2) / cos(vectorLineAngle) );

	//Converting back to angleMode RADIANS so it doesn't mess up other calculations
	angleMode(RADIANS);


	//hypotenuse formula:
	vectorLineLength = sqrt(sq (Math.abs(vectorLine.x)) + sq (Math.abs(vectorLine.y)));



	//Calculating the collision with trigonometry:
	if (vectorLineLength < vectorLineInBoxLengthObj1 + vectorLineInBoxLengthObj2) {
		//console.log('vectorLineInBoxLengthObj1', vectorLineInBoxLengthObj1);
		//console.log('vectorLineInBoxLengthObj2', vectorLineInBoxLengthObj2)
		return true;
	} else {
		return false;
	}
}