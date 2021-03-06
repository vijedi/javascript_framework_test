/*
 * This file is part of Appcelerator.
 *
 * Copyright (C) 2006-2008 by Appcelerator, Inc. All Rights Reserved.
 * For more information, please visit http://www.appcelerator.org
 *
 * Appcelerator is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


Appcelerator.Widget.Iterator =
{
	getName: function()
	{
		return 'appcelerator iterator';
	},
	getDescription: function()
	{
		return 'iterator widget';
	},
	getVersion: function()
	{
		return '1.0.3';
	},
	getSpecVersion: function()
	{
		return 1.0;
	},
	getAuthor: function()
	{
		return 'Jeff Haynie';
	},
	getModuleURL: function ()
	{
		return 'http://www.appcelerator.org';
	},
	isWidget: function ()
	{
		return true;
	},
	getWidgetName: function()
	{
		return 'app:iterator';
	},
	getAttributes: function()
	{
		var T = Appcelerator.Types;
		return [{name: 'on', optional: true, type: T.onExpr,
				 description: "Used to execute the iterator"},
				{name: 'items', optional: true, type: T.json,
				 description: "Literal (or template-replaced) JSON array to iterate over"},
				{name: 'property', optional: true, type: T.identifier},
				
				{name: 'rowEvenClassName', optional: true, type: T.cssClass},
				{name: 'rowOddClassName', optional: true, type: T.cssClass},
				{name: 'createrows', optional: true, defaultValue: 'true', type: T.bool},
				{name: 'table', optional: true, defaultValue: 'false', type: T.bool},
				{name: 'width', optional: true, defaultValue: '100%', type: T.cssDimension},
				{name: 'headers', optional: true, defaultValue: ',', type: T.commaSeparated},
				{name: 'headersLangid', optional: true, defaultValue: ',', type: T.commaSeparated},
				{name: 'headerids', optional: true, defaultValue: ',', type: T.commaSeparated},
				{name: 'headerstyles', optional: true, defaultValue: ',', type: T.commaSeparated},
				{name: 'rowOn', optional: true, defaultValue: '', type: T.identifier},
				{name: 'tableclass', optional: true, defaultValue: '', type: T.identifier},
				{name: 'cellspacing', optional: true, defaultValue: '0', type: T.cssDimension},
				{name: 'selectable', optional: true, type: T.bool}];
	},
	getActions: function()
	{
		return ['execute'];
	},	
	getConditions: function() {
	    return ['executed'];
	},
	execute: function(id,parameterMap,data,scope)
	{
		var compiled = parameterMap['compiled'];
		var propertyName = parameterMap['property'];
		var items = parameterMap['items'];
		
		var table = parameterMap['table'];
		var width = parameterMap['width'];
		var headers = parameterMap['headers'];
		var headersLangid = parameterMap['headersLangid'];
		var headerids = parameterMap['headerids'];
		if (headerids && headerids!='')
			headerids = headerids.split(',');
		var headerstyles = parameterMap['headerstyles'];
		if (headerstyles && headerstyles!='')
			headerstyles = headerstyles.split(',');
		var selectable = parameterMap['selectable'];
		var array = null;
		
		if (!compiled)
		{
			compiled = eval(parameterMap['template'] + '; init_'+id);
			parameterMap['compiled'] = compiled;
		}
		
		if (items) 
		{
			data = items.evalJSON() || [];
		}
		
		if (propertyName)
		{
			array = Object.getNestedProperty(data,propertyName) || [];
		}
		else
		{
			array = data;
		}
		
		var html = [];
		
		if (!array)
		{
			html.push(compiled(data));
		}
		else
		{
			
			if (table)
			{				
				var i=0;
				html.push('<table width="'+width+'" cellspacing="'+parameterMap['cellspacing']+'" class="'+parameterMap['tableclass']+'"><tr>');
				if (headers != ',')  {  
					headers.each(function(h)
					{
						var id='';
						var style=''
						if (headerids)
							id=[' id="', headerids[i], '"'].join('');
						if (headerstyles)
							style=[' style="', headerstyles[i], '"'].join('');
						html.push(['<th', style, id, '>', h, '</th>'].join(''));
						i++;
					});
				} 
				if (headersLangid != ',') {
					headersLangid.each(function(h)
					{
						var id='';
						var style=''
						if (headerids)
							id=[' id="', headerids[i], '"'].join('');
						if (headerstyles)
							style=[' style="', headerstyles[i], '"'].join('');
						if (h.trim() != '') {
							html.push(['<th', style, id, '>',  Appcelerator.Localization.get(h.trim()), '</th>'].join(''));
						} else {
							html.push(['<th', style, id, '>', h, '</th>'].join(''));
						}
						i++;
					});
						
				}			
				html.push('</tr>');
			}
			
		 	// this is in the case we pass in an object instead of 
			// an array, make it an array of length one so we can iterate
			// !Object.isArray(array) fails in some cases so we don't use it (it's poorly implemented)
			if (array.length != 0 && array[0] == undefined)
			{
				array = [array];
			}
			for (var c = 0, len = array.length; c < len; c++)
			{
				var o = array[c];
				if(typeof o != "object")
				{
					o = {'iterator_value': o};
				}
				o['iterator_index']=c;
				o['iterator_length']=len;
				o['iterator_odd_even']=(c%2==0)?'even':'odd';
				if (table)
				{
					if (o['iterator_odd_even'] == 'odd')
						o['iterator_row_class'] = parameterMap['rowOddClassName'];
					else
						o['iterator_row_class'] = parameterMap['rowEvenClassName'];
				}
				/* escape out the "'" so that works in IE */
				for (var idx in o)
				{
					if (typeof o[idx] == 'string')
					{
						//to deal with iterator rendering payload with ' in them
						o[idx] = o[idx].replace(/'/,'\u2019');
						//to properly render escaped html - consider rebuilding the object itself and html escape as alt
						o[idx] = o[idx].replace(/"/,'&quot;');
					}
				}
				html.push(compiled(o));
			}
			
			if (table)
			{
				html.push('</table>');
			}
		}
		
		var element = $(id);
		if (selectable)
		{
			element.setAttribute('selectable',selectable);
		}

		Appcelerator.Compiler.destroyContent(element);
		element.innerHTML = Appcelerator.Compiler.addIENameSpace(html.join(''));
		Appcelerator.Compiler.dynamicCompile(element);
		
		
	},
	compileWidget: function(params) 
	{
		// no message payload to pass for data,
		// maybe we should plumb the triggering message of a dynamic compile through?
		this.execute(params['id'], params, null, '');
	},
	buildWidget: function(element, parameters)
	{
		parameters['table'] = (parameters['table'] == 'true') || ($$AC.getTagname(element) == 'table');;
		parameters['createrows'] = (parameters['createrows']=='true');
		if (parameters['table'])
		{
			if (parameters['headers'].trim() != ',') {
				parameters['headers'] = parameters['headers'].split(',');
			}
			if (parameters['headersLangid'].trim() != ',') {
				parameters['headersLangid'] = parameters['headersLangid'].split(',');
			}
		}

		var html = Appcelerator.Compiler.getHtml(element);
		if (parameters['rowOn'] !='')
			parameters['rowOn'] = 'on="'+parameters['rowOn']+'"';
		if (parameters['table']) {
			if (parameters['createrows']==true)
				html = '<tr '+parameters['rowOn']+' class="#{iterator_row_class}">'+html+'</tr>';
			else
				Logger.info('skipping the tr wrapper for iterator with table');
		}        
		parameters['template'] = $$AC.compileTemplate(html,{htmlOnly:true,varName:('init_'+element.id)});
		parameters['class'] = element.className;
		
		var compile = !!(!parameters['on'] && parameters['items']);
		
		return {
			'presentation' : '',
			'position' : Appcelerator.Compiler.POSITION_REPLACE,
			'parameters': parameters,
			'wire' : true,
			'compile' : compile
		};
	}
};

$$AC = Appcelerator.Compiler;
Appcelerator.Widget.register('app:iterator',Appcelerator.Widget.Iterator);
