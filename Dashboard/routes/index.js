
/*
 * GET home page.
 */
var server = require('../app');
var connection;
exports.index = function(req, res){
  res.render('index', { title: 'Crowdsourced Mobile Diagnostic Services Analytics' });
};

exports.dashboard = function(req, res){
	
	connection = server.poolObject.getConnection();
	var result = "";
	var rowCount = 0;
	var data;
	
	
	try
	{
		var query = "Select * from networkcoverage";
		if(connection != null)
		{
			connection.query(query,function(error,rows,fields){
				if (error)
				{
					console.log("ERROR: " + error.message);
				}
				else
				{
					if(rows.length!==0)
					{

						console.log(rows);
						res.render('dashboard',{networkDetails:rows, title: 'CMDSA-Dashboard' });
					}
					else
					{
						var err="Invalid UerName/Password";
						console.log("returned 0 rows");
						//callback(err);
					}
				}

			});

		}
		else
		{
			console.log('Unable to get the Database Connection');
		}
	}
	catch (e)
	{
		console.log("Error:" + e);
	}
	finally
	{
		if(connection != null)
		{
			server.poolObject.returnConnection(connection);
		}
	}
	

	};
	
	
	exports.mark = function(req, res){
		
		console.log("******" + req.param("radioGroup"));
		connection = server.poolObject.getConnection();
		var result = "";
		var rowCount = 0;
		var data;
		
		
		try
		{
			var query;
			if((req.param("radioGroup") == undefined) || req.param("radioGroup")=="option6")
			{
				query= "Select * from networkcoverage";
			}
			
			else
			{
				var carrier;
			if(req.param("radioGroup") == "option1")
				{
					carrier="T-Mobile";
				}
			else if(req.param("radioGroup") == "option2")
			{
				carrier="AT&T";
			}
			else if(req.param("radioGroup") == "option3")
			{
				carrier="Verizon";
			}
			else if(req.param("radioGroup") == "option4")
			{
				carrier="MetroPCS";
			}
			else if(req.param("radioGroup") == "option5")
			{
				carrier="CricKet";
			}
				 
				query= "Select * from networkcoverage where carrier='" + carrier +  "'";
				console.log(query);
			}
			
			
			//query= "Select * from networkcoverage";
			if(connection != null)
			{
				connection.query(query,function(error,rows,fields){
					if (error)
					{
						console.log("ERROR: " + error.message);
					}
					else
					{
						if(rows.length!==0)
						{
							
							var temp1=[];
							var temp2=[];
							var temp3=[];
							var temp4=[];
							var temp5=[];
							
							for(var i=0;i<rows.length;i++)
							{
								
								if((rows[i].carrier)=="T-Mobile")
				           		 {
				                 	
				                 	temp1.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier)=="AT&T")
				                 {
				                	 
				                	 temp2.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier)=="cricKet")
				                 {
				                	
				                	 temp5.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier)=="Verizon")
				                 {
				                	 
				                	 temp3.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier)=="MetroPCS")
				                 {
				                	 
				                	 temp4.push(rows[i].signalStrength);
				                	 
				                 }
							}
							
							var S1 =0,S2=0,S3=0,S4=0,S5=0;
							for(i=0;i<temp1.length;i++)
							{
								S1 = S1+temp1[i];
							}
							for(i=0;i<temp2.length;i++)
							{
								S2 = S2+temp2[i];
							}
							for(i=0;i<temp3.length;i++)
							{
								S3 = S3+temp3[i];
							}
							for(i=0;i<temp4.length;i++)
							{
								S4 = S4+temp4[i];
							}
							for(i=0;i<temp5.length;i++)
							{
								S5 = S5+temp5[i];
							}
							
							var sigMap = [];
							
							sigMap.push((S1/temp1.length));
							sigMap.push((S2/temp2.length));
							sigMap.push((S3/temp3.length));
							sigMap.push((S4/temp4.length));
							sigMap.push((S5/temp5.length));
							
							console.log(">>>>>" + sigMap[0]);
							console.log(">>>>>" + sigMap[1]);
							console.log(">>>>>" + sigMap[2]);
							console.log(">>>>>" + sigMap[3]);
							console.log(">>>>>" + sigMap[4]);
							
							

							//console.log(rows);
							res.render('markerMap',{networkDetails:rows,sigMap:sigMap, title: 'CMDSA-Marker Map' });
						}
						else
						{
							var err="Invalid UerName/Password";
							console.log("returned 0 rows");
							//callback(err);
						}
					}

				});

			}
			else
			{
				console.log('Unable to get the Database Connection');
			}
		}
		catch (e)
		{
			console.log("Error:" + e);
		}
		finally
		{
			if(connection != null)
			{
				server.poolObject.returnConnection(connection);
			}
		}
		

		};
	
	
	
	exports.chart = function(req, res){
		connection = server.poolObject.getConnection();
		var result = "";
		var rowCount = 0;
		var data;
		
		
		try
		{
			var query = "Select * from networkcoverage";
			if(connection != null)
			{
				connection.query(query,function(error,rows,fields){
					if (error)
					{
						console.log("ERROR: " + error.message);
					}
					else
					{
						if(rows.length!==0)
						{

							console.log(rows);
							
							var T1=[];
							var T2=[];
							var T3=[];
							var T4=[];
							var T5=[];
							
							var temp1=[];
							var temp2=[];
							var temp3=[];
							var temp4=[];
							var temp5=[];
							
							for(var i=0;i<rows.length;i++)
							{
								
								if((rows[i].carrier).localeCompare("T-Mobile"))
				           		 {
				                 	T1.push(rows[i].downloadSpeed);
				                 	temp1.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier).localeCompare("ATT"))
				                 {
				                	 T2.push(rows[i].downloadSpeed);
				                	 temp2.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier).localeCompare("cricKet"))
				                 {
				                	 T5.push(rows[i].downloadSpeed);
				                	 temp5.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier).localeCompare("Verizon"))
				                 {
				                	 T3.push(rows[i].downloadSpeed);
				                	 temp3.push(rows[i].signalStrength);
				                 }
				                 if((rows[i].carrier).localeCompare("MetroPCS"))
				                 {
				                	 T4.push(rows[i].downloadSpeed);
				                	 temp5.push(rows[i].signalStrength);
				                	 
				                 }
							}
							
							var S1 =0,S2=0,S3=0,S4=0,S5=0;
							for(i=0;i<temp1.length;i++)
							{
								S1 = S1+temp1[i];
							}
							for(i=0;i<temp2.length;i++)
							{
								S2 = S2+temp2[i];
							}
							for(i=0;i<temp3.length;i++)
							{
								S3 = S3+temp3[i];
							}
							for(i=0;i<temp4.length;i++)
							{
								S4 = S4+temp4[i];
							}
							for(i=0;i<temp5.length;i++)
							{
								S5 = S5+temp5[i];
							}
							
							
							
							
							
							var avgT1 =0;
							for(i=0;i<T1.length;i++)
							{
								avgT1 = avgT1+T1[i];
							}
							var avgT2 =0;
							for(i=0;i<T2.length;i++)
							{
								avgT2 = avgT2+T2[i];
							}
							var avgT3 =0;
							for(i=0;i<T3.length;i++)
							{
								avgT3 = avgT3+T3[i];
							}
							var avgT4 =0;
							for(i=0;i<T4.length;i++)
							{
								avgT4 = avgT4+T4[i];
							}
							var avgT5 =0;
							for(i=0;i<T5.length;i++)
							{
								avgT5 = avgT5+T5[i];
							}
							var map = [];
							var sigMap = [];
							
							sigMap.push((S1/temp1.length));
							sigMap.push((S2/temp2.length));
							sigMap.push((S3/temp3.length));
							sigMap.push((S4/temp4.length));
							sigMap.push((S5/temp5.length));
							
							
							
							map.push((avgT1 / T1.length));
							map.push((avgT2 / T2.length));
							map.push((avgT3 / T3.length));
							map.push((avgT4 / T4.length));
							map.push((avgT5 / T5.length));
							
							res.render('chart',{networkDetails:map,signalStrength:sigMap, title: 'CMDSA-Dashboard' });
						}
						else
						{
							var err="Invalid UerName/Password";
							console.log("returned 0 rows");
							//callback(err);
						}
					}

				});

			}
			else
			{
				console.log('Unable to get the Database Connection');
			}
		}
		catch (e)
		{
			console.log("Error:" + e);
		}
		finally
		{
			if(connection != null)
			{
				server.poolObject.returnConnection(connection);
			}
		}
		
		};
		
		
		exports.uploadchart = function(req, res){
			connection = server.poolObject.getConnection();
			var result = "";
			var rowCount = 0;
			var data;
			
			
			try
			{
				var query = "Select * from networkcoverage";
				if(connection != null)
				{
					connection.query(query,function(error,rows,fields){
						if (error)
						{
							console.log("ERROR: " + error.message);
						}
						else
						{
							if(rows.length!==0)
							{

								console.log(rows);
								
								var T1=[];
								var T2=[];
								var T3=[];
								var T4=[];
								var T5=[];
								for(var i=0;i<rows.length;i++)
								{
									
									if((rows[i].carrier).localeCompare("T-Mobile"))
					           		 {
					                 	T1.push(rows[i].uploadSpeed);
					                 }
					                 if((rows[i].carrier).localeCompare("ATT"))
					                 {
					                	 T2.push(rows[i].uploadSpeed);
					                 }
					                 if((rows[i].carrier).localeCompare("cricKet"))
					                 {
					                	 T5.push(rows[i].downloadSpeed);
					                 }
					                 if((rows[i].carrier).localeCompare("Verizon"))
					                 {
					                	 T3.push(rows[i].uploadSpeed);
					                 }
					                 if((rows[i].carrier).localeCompare("MetroPCS"))
					                 {
					                	 T4.push(rows[i].uploadSpeed);
					                 }
								}
								var avgT1 =0;
								for(i=0;i<T1.length;i++)
								{
									avgT1 = avgT1+T1[i];
								}
								var avgT2 =0;
								for(i=0;i<T2.length;i++)
								{
									avgT2 = avgT2+T2[i];
								}
								var avgT3 =0;
								for(i=0;i<T3.length;i++)
								{
									avgT3 = avgT3+T3[i];
								}
								var avgT4 =0;
								for(i=0;i<T4.length;i++)
								{
									avgT4 = avgT4+T4[i];
								}
								var avgT5 =0;
								for(i=0;i<T5.length;i++)
								{
									avgT5 = avgT5+T5[i];
								}
								var map = [];
								map.push((avgT1 / T1.length));
								map.push((avgT2 / T2.length));
								map.push((avgT3 / T3.length));
								map.push((avgT4 / T4.length));
								map.push((avgT5 / T5.length));
								
								res.render('uploadchart',{networkDetails:map, title: 'CMDSA-Dashboard' });
							}
							else
							{
								var err="Invalid UerName/Password";
								console.log("returned 0 rows");
								//callback(err);
							}
						}

					});

				}
				else
				{
					console.log('Unable to get the Database Connection');
				}
			}
			catch (e)
			{
				console.log("Error:" + e);
			}
			finally
			{
				if(connection != null)
				{
					server.poolObject.returnConnection(connection);
				}
			}
			
			};