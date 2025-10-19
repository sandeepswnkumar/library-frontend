import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type RegisterFormProps = React.ComponentProps<'div'> & {
  setAuthTab?: (tab: string) => void
}

export default function RegisterForm({
  className,
  setAuthTab,
  ...props
}: RegisterFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form>
            <FieldGroup className="gap-3">
              <Field>
                <FieldLabel htmlFor="email">Mobile Number</FieldLabel>
                <Input
                  id="email"
                  type="tel"
                  placeholder="9956xxxxxx"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">OTP</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="****"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="****"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="****"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="cursor-pointer">
                  Register
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
