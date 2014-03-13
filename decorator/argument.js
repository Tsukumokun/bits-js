//
// MODULES-JS: DECORATORS: argumentDecorator
// Copyright (C) 2014 Christopher Kelley   <tsukumokun(at)icloud.com>
//                    Till Smejkal         <till.smejkal(at)gmail.com>
//
// This work is licensed under the
// Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
// International License. To view a copy of this license, visit
// http://creativecommons.org/licenses/by-nc-nd/4.0/deed.en_US.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//

package decorator

import [./../lang]error.js

decorator.argtype =
{
    UNDEFINED   :typeof this.undefined,
    FUNCTION    :typeof function(){},
    OBJECT      :typeof {},
    NUMBER      :typeof 0,
    STRING      :typeof '',
    BOOLEAN     :typeof true
}

/**
 * Argument decorator wraps a function in order to check that
 * arguments passed to it are of the expected type
 *
 * @namespace decorator
 * @param {Function} f function to be wrapped by this decorator
 * @param {Object | String | Function} expectations expected arguments
 *                                     in to be passed to the wrapped class.
 */
decorator.argumentDecorator = function( /*f, expectations*/ )
{

    // Store the first parameter as a function
    var f = [].shift.apply(arguments);

    // Check the function is really a function
    if (typeof f != argtype.FUNCTION)
    {
        throw new InvalidArgumentError('arg 0' +
            'expected function; got' + typeof f);
    }

    // Check the parameters are functions or strings
    index = 1;
    for(var key in arguments)
    {
        var item = arguments[key];
        if ( (typeof item) != argtype.FUNCTION
                           &&
             (typeof item) != argtype.STRING
                           &&
             (typeof item) != argtype.OBJECT)
        {
            throw new InvalidArgumentError('arg ' + index +
            'expected function or string or object; got' + (typeof item));
        }
        index++;
    }

    // Set the arguments to be forwarded to the internal function
    var expectations = arguments;

    // Give back a wrapper function
    return function(/*args*/)
    {
        // Check for the length of the arguments
        if (expectations.length != arguments.length)
        {
            throw new InvalidArgumentCountError(
                'expected ' + expectations.length +
                '; got ' + arguments.length);
        }

        // For every argument, check that it matches the expected arguments
        for (index = 0; index < expectations.length; index++)
        {
            var etype = expectations[index];
            var atype = typeof arguments[index];

            // If the type is a function search for instanceof
            if (typeof etype == 'function')
            {
                // If the argument is not an object the user
                // input the wrong type of argument
                if (atype != 'object')
                {
                    throw new InvalidArgumentError('arg ' + index +
                        '; expected object; got ' + atype);
                }
                // Otherwise check if the prototypes match
                if (! (arguments[index] instanceof expectations[index]))
                {
                    var ename =
                        expectations[index].name || 'anonymous function';
                    var aname =
                        arguments[index].name || 'anonymous function';
                    throw new InvalidArgumentError('arg ' + index +
                        ': expected ' + ename + '; got ' + aname);
                }
            }
            else
            {
                // If the type is an object iterate over every object
                // and ensure that it is of the correct type
                if (typeof etype == argtype.OBJECT)
                {
                    found = false;

                    for(var key in etype)
                    {
                        var item = etype[key];
                        if (item == atype)
                        {
                            found = true;
                        }
                    }
                    if (! found)
                    {
                        // Get all of the types it could have been
                        eline = ''
                        for(var key in etype)
                        {
                            eline += ' or ' + etype[key];
                        }
                        throw new InvalidArgumentError('arg '+index+
                            '; expected '+eline.substring(4)+'; got '+atype);
                    }
                }
                //Otherwise it must be a type so match that
                else if (etype != atype)
                {
                    throw new InvalidArgumentError('arg '+index+
                        '; expected '+etype+'; got '+atype);
                }
            }
        }
        // Given no errors were thrown, call the original
        // function with the arguments and return its return value
        return f.apply(this,arguments);
    }
}
