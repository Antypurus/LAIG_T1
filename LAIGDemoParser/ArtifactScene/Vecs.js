class Vecs
{
    static angleBetweenVecs(vector1, vector2)
    {
        var cos = this.vecDotProduct(vector1, vector2) / (this.vecMagnitude(vector1) * this.vecMagnitude(vector2));
        if (cos > 1)
            cos = 1;
        return Math.acos(cos);
    }

    static vecDotProduct(vector1, vector2)
    {
        var result = 0;
        for (var i = 0; i < vector1.length; i++)
        {
            result += vector1[i] * vector2[i];
        }
        return result;
    }

    static vecMagnitude(vector)
    {
        var magnitude = 0;
        for (var i = 0; i < vector.length; i++)
        {
            magnitude += (vector[i] * vector[i]);
        }
        magnitude = Math.sqrt(magnitude);
        return magnitude;
    }

	static vecCrossProduct(vector1, vector2)
	{
		var result = [vector1[1] * vector2[2] - vector1[2] * vector2[1], vector1[2] * vector2[0] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector1[1] * vector2[0]]
			return result;
	}
}