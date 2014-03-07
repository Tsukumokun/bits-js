//
// MODULES-JS: PATTERN: Observable
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

package pattern

/**
 * @class pattern.Observable
 * 
 * Observable is a simple implementation of the observer pattern.
 * http://en.wikipedia.org/wiki/Observer_pattern
 * 
 * @namespace pattern
 * @extends Object
 */
pattern.Observable = function ( sender )
{
    this.sender     = sender;
    this.observers  = [ ];
}

/**
 * Attaches an observer to the observeable.
 * 
 * @param {Function} listener function to be called by notify
 */
pattern.Observable.prototype.attach = function ( listener )
{
    this.observers.push(listener);
}
/**
 * Detaches a previously registered observer.
 * 
 * @param {Function} listener function to be removed from notifications
 */
pattern.Observable.prototype.detach = function ( listener )
{
    var at = this.observers.indexOf( listener );
    if (at > 0)
        this.observers.splice(at,1);
}
/**
 * Notifies all existing observers.
 * 
 * @param {Object} argv argument object ot be passed to the listeners
 */
pattern.Observable.prototype.notify = function ( args )
{
    var that = this;
    observers.forEach(
        function ( )
        {
            this(that.sender,args);
        }
    );
}

