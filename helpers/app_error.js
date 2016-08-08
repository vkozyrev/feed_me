var util = require( "util" );

exports.AppError = AppError;

exports.createAppError = createAppError;

function createAppError(settings) {

    // NOTE: We are overriding the "implementationContext" so that the createAppError()
    // function is not part of the resulting stacktrace.
    return(new AppError(settings, createAppError));
};

function AppError(settings, implementationContext) {
    settings = (settings || {});
    this.name = "AppError";
    this.type = (settings.type || "Application");
    this.message = (settings.message || "An error occurred.");
    this.detail = (settings.detail || "" );
    this.extendedInfo = (settings.extendedInfo || "");
    this.errorCode = (settings.errorCode || "");
    this.isAppError = true;
    Error.captureStackTrace(this, (implementationContext || AppError));
};

util.inherits(AppError, Error);