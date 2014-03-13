//
// MODULES-JS: LANG: NotImplementedError
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

package lang

lang.NotImplementedError = function( message )
{
    this.constructor.prototype.__proto__ = Error.prototype;
    this.name = 'NotImplementedError';
    this.message = message;
    Error.captureStackTrace(this, this.constructor)
}
lang.InvalidArgumentError = function( message )
{
    this.constructor.prototype.__proto__ = Error.prototype;
    this.name = 'InvalidArgumentError';
    this.message = message;
    Error.captureStackTrace(this, this.constructor)
}
lang.InvalidArgumentCountError = function( message )
{
    this.constructor.prototype.__proto__ = Error.prototype;
    this.name = 'InvalidArgumentCountError';
    this.message = message;
    Error.captureStackTrace(this, this.constructor)
}
