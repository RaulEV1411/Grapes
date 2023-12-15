# The RackSessionsFix module is designed to provide a workaround for handling Rack sessions.
module RackSessionsFix
    # The ActiveSupport::Concern module is extended to include additional Rails-specific class methods.
    extend ActiveSupport::Concern

    # The FakeRackSession class inherits from Hash, and is used to simulate a Rack session.
    class FakeRackSession < Hash
        # The 'set_fake_session' method is called before any action is performed.
        before_action :set_fake_session

        # The 'enabled?' method always returns false. This could be used to check if the session is enabled.
        def enabled?
            false
        end

        # The 'destroy' method is an empty method that could be used to destroy the session.
        def destroy; end
    end

    # The 'included' method is called when the module is included in a class.
    included do
        private
        # The 'set_fake_session' method sets the 'rack.session' environment variable to a new instance of FakeRackSession if it isn't already set.
        def set_fake_session
            request.env['rack.session'] ||= FakeRackSession.new
        end
    end
end
